import { CreditCardIcon, CurrencyDollarIcon, HomeIcon, RefreshIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface IProps {
  visible: boolean;
}

export const Nav = ({ visible }: IProps) => {
  return (
    <nav className={`bg-nav ${visible ? 'fixed mt-10 inline h-full w-[16rem]' : 'hidden w-0'} z-50 text-white transition lg:inline lg:min-w-[16rem]`}>
      <div className="p-5 text-center text-2xl font-semibold">Seilá</div>

      <div className="flex flex-col px-20 py-10 text-center">
        <img className="rounded-full" src="https://en.gravatar.com/userimage/91635443/01ad188bad8f7a70253abb54b4b417a5.png?size=100" />

        <div className="mt-5 font-semibold">Rony Moura</div>
      </div>

      <ul className="space-y-3 p-3 text-lg">
        <li>
          <Link className="flex items-center" href="/">
            <HomeIcon className="mr-2 h-5 w-5" />
            Home
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href="/recurrentBills">
            <RefreshIcon className="mr-2 h-5 w-5" />
            Pagamentos Recorrentes
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href="/cards">
            <CreditCardIcon className="mr-2 h-5 w-5" />
            Cartões
          </Link>
        </li>
        <li>
          <Link className="flex items-center" href="/invest">
            <CurrencyDollarIcon className="mr-2 h-5 w-5" />
            Investimentos
          </Link>
        </li>
      </ul>
    </nav>
  );
};
