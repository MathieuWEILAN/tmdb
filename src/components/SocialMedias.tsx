import { SocialMediasType } from "@/models/types";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import XIcon from "@/assets/icons/XIcon";
import IMDBIcon from "@/assets/icons/IMDBIcon";
import Link from "next/link";
const SocialMedias: React.FC<SocialMediasType> = (socials) => {
  return (
    <div className="flex w-full items-center space-x-4 my-5">
      {socials.facebook_id && (
        <Link
          href={`https://www.facebook.com/${socials.facebook_id}`}
          target="_blank"
        >
          <FacebookIcon onClick={() => console.log("facebook")} />
        </Link>
      )}
      {socials.instagram_id && (
        <Link
          href={`https://www.instagram.com/${socials.instagram_id}`}
          target="_blank"
        >
          <InstagramIcon onClick={() => console.log("instagram")} />
        </Link>
      )}

      {socials.twitter_id && (
        <Link
          href={`https://twitter.com/${socials.instagram_id}`}
          target="_blank"
        >
          <XIcon onClick={() => console.log("close")} />
        </Link>
      )}

      {socials.imdb_id && (
        <Link href={`https://imdb.com/${socials.instagram_id}`} target="_blank">
          <IMDBIcon onClick={() => console.log("imdb")} />
        </Link>
      )}
    </div>
  );
};

export default SocialMedias;
