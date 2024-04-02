import { SocialMediasType } from "@/models/types";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import XIcon from "@/assets/icons/XIcon";
import IMDBIcon from "@/assets/icons/IMDBIcon";
import Link from "next/link";
const SocialMedias: React.FC<SocialMediasType> = (socials) => {
  return (
    <div className="flex w-full items-center space-x-4 my-5">
      {socials.facebook_id && <FacebookIcon path={socials.facebook_id} />}
      {socials.instagram_id && <InstagramIcon path={socials.instagram_id} />}
      {socials.twitter_id && <XIcon path={socials.twitter_id} />}
      {socials.imdb_id && <IMDBIcon path={socials.imdb_id} />}
    </div>
  );
};

export default SocialMedias;
