import { CreditCardIcon, CurrencyDollarIcon, HomeIcon, RefreshIcon } from '@heroicons/react/solid';
import React from 'react';

interface IProps {
  visible: boolean;
}

export const Nav: React.FC<IProps> = ({ visible }) => {
  return (
    <nav
      className={`bg-nav ${
        visible ? 'fixed mt-10 inline h-full w-[16rem]' : 'hidden w-0'
      } z-50 text-white transition lg:inline lg:w-[16rem]`}
    >
      <div className="p-5 text-center text-2xl font-semibold">Seilá</div>

      <div className="flex flex-col px-20 py-10 text-center">
        <img
          className="rounded-full"
          src="https://en.gravatar.com/userimage/91635443/01ad188bad8f7a70253abb54b4b417a5.png?size=100"
        />

        <div className="mt-5 font-semibold">Rony Moura</div>
      </div>

      <ul className="space-y-3 p-3 text-lg">
        <li>
          <a className="flex items-center" href="/home">
            <HomeIcon className="mr-2 h-5 w-5" />
            Home
          </a>
        </li>
        <li>
          <a className="flex items-center" href="/recurrentBills">
            <RefreshIcon className="mr-2 h-5 w-5" />
            Pagamentos Recorrentes
          </a>
        </li>
        <li>
          <a className="flex items-center" href="/cards">
            <CreditCardIcon className="mr-2 h-5 w-5" />
            Cartões
          </a>
        </li>
        <li>
          <a className="flex items-center" href="/invest">
            <CurrencyDollarIcon className="mr-2 h-5 w-5" />
            Investimentos
          </a>
        </li>
      </ul>
    </nav>
  );
};
