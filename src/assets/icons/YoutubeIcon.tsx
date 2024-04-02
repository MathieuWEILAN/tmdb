import Link from "next/link";
const YoutubeIcon = ({
  className,
  onClick,
  path,
}: {
  className?: string;
  onClick?: any;
  path: string;
}) => {
  return (
    <Link href={`https://www.youtube.com/channel/${path}`} target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 72"
        width="40px"
        height="40px"
      >
        <path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56	s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z" />
      </svg>
    </Link>
  );
};
export default YoutubeIcon;
