import { ProviderType, ProvidersListing } from "@/models/types";
import CloseIcon from "@/assets/icons/CloseIcon";
import Image from "next/image";
import { wording } from "@/lib/utils";
import { useRouter } from "next/router";
const ModalProviders = ({
  providers,
  setIsModal,
}: {
  providers: ProvidersListing;
  setIsModal: any;
}) => {
  console.log(providers);
  const { locale } = useRouter();
  return (
    <div className="banner w-screen h-screen z-[100] bg-stone-950 fixed top-0 bg-opacity-90 left-0">
      <div className="relative h-full w-full flex items-center justify-center">
        <CloseIcon
          className="absolute top-[30px] right-[30px] cursor-pointer"
          onClick={() => setIsModal(false)}
          stroke="white"
        />
        <div
          className={`h-2/3 md:h-auto w-[1080px] bg-stone-50 rounded-xl p-10 flex justify-center flex-col space-y-10`}
        >
          {providers?.buy && (
            <>
              <h2 className="text-2xl font-bold">{wording(locale, "buy")}</h2>
              <div className="flex gap-2 flex-wrap">
                {providers?.buy.map((provider: ProviderType) => {
                  return (
                    <Image
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_id.toString()}
                      width={80}
                      height={80}
                      className="rounded-lg h-10 w-10 md:h-20 md:w-20 object-cover object-center"
                    />
                  );
                })}
              </div>
            </>
          )}
          {providers?.rent && (
            <>
              <h2 className="text-2xl font-bold">{wording(locale, "rent")}</h2>
              <div className="flex gap-2 flex-wrap">
                {providers?.rent.map((provider: ProviderType) => {
                  return (
                    <Image
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_id.toString()}
                      width={80}
                      height={80}
                      className="rounded-lg h-10 w-10 md:h-20 md:w-20 object-cover object-center"
                    />
                  );
                })}
              </div>
            </>
          )}
          {providers?.flatrate && (
            <>
              <h2 className="text-2xl font-bold">
                {wording(locale, "flatrate")}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {providers?.flatrate.map((provider: ProviderType) => {
                  return (
                    <Image
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_id.toString()}
                      width={80}
                      height={80}
                      className="rounded-lg h-10 w-10 md:h-20 md:w-20 object-cover object-center"
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalProviders;
