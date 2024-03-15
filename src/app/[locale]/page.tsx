import Image from "next/image";
import { useTranslations } from "next-intl";
import Languages from "@/components/languages";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Login");
  return (
    // Logo centered
    <div className="flex-1 justify-center px-6 py-12 lg:px-8 min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <Languages />
      <Link href="/home" className="font-bold">
        go to home
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="w-full mb-10"
          src="/pictures/HFMlogo.png"
          height={500}
          width={500}
          priority
          alt="Helsingin miekkailijat ry"
        />
      </div>
      <div className="border-2 border-gray-900 w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg justify-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pb-8">
              Kirjaudu sisään
            </h2> */}
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("name")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("password")}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-5"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}