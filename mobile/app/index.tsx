import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import { useService } from "../src/hooks";
import { CategoriesService } from "../src/services";
import { Item } from "../src/types";
import { ItemsService } from "../src/services/ItemsService";
import { LoadingComponent } from "../src/components/LoadingComponent";
import { ItemHistoryService } from "../src/services/ItemHistoryService";

type Group = {
  categoryId: string;
  items: Item[];
};

export default function App() {
  const [ItemName, setItemName] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [ItemId, setItemId] = useState(null);

  const [CategoryListShown, setCategoryListShown] = useState(false);

  const [Quantity, setQuantity] = useState(1);
  const [Value, setValue] = useState(0);
  const [Brand, setBrand] = useState("");

  const { data: categories, isLoading: loadingCategories } = useService(() =>
    CategoriesService.list()
  );

  const {
    data: items,
    isLoading: loadingItems,
    refetch: refetchItems,
  } = useService(() => ItemsService.list());

  const category = categories?.filter((x) => x.id === CategoryId)[0];

  useEffect(() => {
    if (categories?.length > 0 && !CategoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  if (loadingCategories || loadingItems) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingComponent />
      </View>
    );
  }

  const groups = items?.reduce<Group[]>((list: Group[], current) => {
    if (list.some((x) => x.categoryId === current.categoryId)) {
      list
        .filter((x) => x.categoryId === current.categoryId)[0]
        .items.push(current);
    } else {
      list.push({
        categoryId: current.categoryId,
        items: [current],
      });
    }

    return list;
  }, []);

  async function handleAdd() {
    if (!ItemName) {
      Alert.alert("Erro", "Por favor, insira o nome do item");
      return;
    }

    await ItemsService.create({
      name: ItemName,
      categoryId: CategoryId,
    });

    await refetchItems();
    setItemName("");
  }

  function handleSelectItem(item: Item) {
    setItemId(item.id);

    if (item?.ItemHistory?.length > 0) {
      console.log(item?.ItemHistory[0].value);

      setQuantity(item?.ItemHistory[0].quantity);
      setValue(+item?.ItemHistory[0].value);
      setBrand(item?.ItemHistory[0].brand);
    }
  }

  async function handleSaveItem() {
    await ItemHistoryService.create({
      itemId: ItemId,
      quantity: Quantity,
      value: Value,
      brand: Brand,
    });

    await refetchItems();

    clearItem();
  }

  async function handleDeleteItem() {
    await ItemsService.delete(ItemId);

    await refetchItems();

    clearItem();
  }

  function clearItem() {
    setQuantity(1);
    setValue(0);
    setBrand("");
    setItemId(null);
  }

  return (
    <View className="flex-1 space-y-3">
      <View className="relative z-30 mt-10 space-y-3 px-4">
        {/* Header */}
        <View className="h-[55px] flex-row items-center space-x-3">
          <TouchableOpacity
            className={`relative h-full w-[50px] items-center justify-center space-y-2 rounded-md px-4 py-2 ${
              CategoryListShown ? "rounded-b-none bg-white" : "bg-purple-500"
            }`}
            onPress={() => setCategoryListShown((old) => !old)}
          >
            <FontAwesome5
              name={category?.icon}
              size={20}
              color={CategoryListShown ? "#8257e5" : "white"}
            />
            <View className="absolute bottom-1">
              <Feather
                name={CategoryListShown ? "chevron-up" : "chevron-down"}
                color={CategoryListShown ? "#8257e5" : "white"}
              />
            </View>
          </TouchableOpacity>

          <TextInput
            className="h-full flex-1 justify-center rounded-md bg-white px-3 font-body"
            placeholderTextColor="#56565a"
            placeholder="Adicione um item..."
            style={{ fontSize: 18 }}
            value={ItemName}
            onChangeText={setItemName}
          />

          <TouchableOpacity
            className="h-full items-center justify-center rounded-md bg-green-400 p-2"
            onPress={handleAdd}
          >
            <Feather name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Category List */}
        <View
          className={`absolute left-4 top-10 min-w-[200px] rounded-b-md rounded-r-md bg-white shadow ${
            CategoryListShown ? "p-3" : "h-0 w-0"
          }`}
        >
          <ScrollView className="space-y-3">
            {categories?.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="flex-row items-center space-x-4 rounded-md bg-slate-200 p-4"
                onPress={() => {
                  setCategoryId(category.id);
                  setCategoryListShown(false);
                }}
              >
                <FontAwesome5 name={category.icon} size={20} color="#8257e5" />
                <Text className="font-body text-lg">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* List */}
      <ScrollView className="z-10">
        <View className="space-y-4 p-4">
          {groups?.map((categoryItem) => {
            const category = categories.filter(
              (x) => x.id === categoryItem.categoryId
            )[0];

            return (
              <View
                key={categoryItem.categoryId}
                className="space-y-3 rounded-md bg-white p-3"
              >
                <View className="left-1 flex-row items-center space-x-3">
                  <FontAwesome5
                    name={category.icon}
                    size={20}
                    color="#8257e5"
                  />

                  <Text className="font-body text-lg">{category.name}</Text>
                </View>

                <View>
                  {categoryItem.items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="flex-row items-center space-x-3 p-2"
                      onPress={() => handleSelectItem(item)}
                    >
                      {item?.ItemHistory?.length === 0 && (
                        <View className="h-7 w-7 rounded-md border-2 border-purple-500"></View>
                      )}

                      {item?.ItemHistory?.length > 0 && (
                        <View className="h-7 w-7 items-center justify-center rounded-md border-2 border-[#04c058]">
                          <FontAwesome5
                            name="check"
                            size={16}
                            color="#04c058"
                          />
                        </View>
                      )}

                      <Text className="font-body">{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Modal */}
      {ItemId && (
        <>
          <View className="absolute -top-3 bottom-0 left-0 right-0 z-40 bg-black p-2 opacity-40"></View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="absolute z-40 h-full w-full items-center justify-center"
          >
            <View className="h-fit w-3/4 space-y-7 rounded-md bg-white p-4 shadow-md">
              <View className="space-y-2">
                <Text className="font-body text-lg">Quantidade</Text>

                <View className="flex-row">
                  <TouchableOpacity
                    className="rounded-md bg-purple-500 p-2"
                    onPress={() =>
                      setQuantity((old) => (old - 1 > -1 ? --old : 0))
                    }
                  >
                    <FontAwesome5 name="minus" size={20} color="white" />
                  </TouchableOpacity>

                  <View className="flex-1 items-center justify-center">
                    <Text className="font-body text-2xl">{Quantity}</Text>
                  </View>

                  <TouchableOpacity
                    className="rounded-md bg-purple-500 p-2"
                    onPress={() => setQuantity((old) => ++old)}
                  >
                    <FontAwesome5 name="plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="font-body text-lg">Valor</Text>

                <View className="flex-row">
                  <TextInputMask
                    className="w-full rounded-md bg-gray-100 px-4 py-2 font-body"
                    type="money"
                    placeholderTextColor="#56565a"
                    style={{ fontSize: 24 }}
                    keyboardType="numeric"
                    returnKeyLabel="ok"
                    returnKeyType="done"
                    includeRawValueInChangeText
                    value={Value.toFixed(2)}
                    onChangeText={(a, b) => {
                      setValue(+b);
                    }}
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="font-body text-lg">Marca</Text>

                <View className="flex-row">
                  <TextInput
                    className="w-full rounded-md bg-gray-100 px-4 py-2 font-body"
                    placeholderTextColor="#56565a"
                    style={{ fontSize: 20 }}
                    value={Brand}
                    onChangeText={setBrand}
                  />
                </View>
              </View>

              <View className="space-y-3">
                <TouchableOpacity
                  className="items-center justify-center rounded-md bg-purple-500 py-2"
                  onPress={handleSaveItem}
                >
                  <Text className="font-body text-white">Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="items-center justify-center rounded-md bg-gray-400 py-2"
                  onPress={clearItem}
                >
                  <Text className="font-body text-white">Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="items-center justify-center rounded-md bg-red-400 py-2"
                  onPress={handleDeleteItem}
                >
                  <Text className="font-body text-white">Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
}
