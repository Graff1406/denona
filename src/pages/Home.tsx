import { FC, useState } from "react";
import { signInGoogleWithPopup } from "@/shared/firebase/public";

// Shared

import { MainLayout } from "@/widgets/layouts";
import { ZnButton, ZnIconButton } from "@/shared/ui";
import { useAppSelector } from "@/shared/hooks/public";

// Features

import { type UserState } from "@/features/auth/public";

// Icons

import { FcGoogle } from "react-icons/fc";
import { MdPersonAdd, MdMenu } from "react-icons/md";

const title = "What you focus on determines the quality of your life.";
const description = `The service should remind, help, suggest, guide in different situations. Keep the user within the chosen values, conform to an
acceptable philosophy, Facilitate following the chosen path.`;

const Home: FC = () => {
  const user: UserState = useAppSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);

  const onToggleMenu = () => setOpenMenu(!openMenu);
  const onAuthByGoogle = () => {
    signInGoogleWithPopup();
  };

  return (
    <MainLayout
      aside={
        user.auth ? (
          <ul>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((el) => (
              <li
                key={el}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer rounded-md"
              >
                {el} - test
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-40">
            <ZnButton
              label="Continue with Google"
              areaLabel="Use the button for Access to the site"
              title="Get started to use the site"
              icon={<FcGoogle className="icon" />}
              onClick={onAuthByGoogle}
            />
          </div>
        )
      }
      content={
        <>
          <h1 className="text-xl mb-4">{title}</h1>
          <h2>{description}</h2>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
          <p>{description}</p>
        </>
      }
      headerRight={
        user.auth ? (
          <ZnIconButton
            className="tablet:hidden"
            icon={<MdMenu className="icon" />}
            areaLabel="Main mobile menu button"
            onClick={onToggleMenu}
          />
        ) : (
          <ZnButton
            className="tablet:hidden"
            label="Get started"
            areaLabel="Use the button for Access to the site"
            title="Get started to use the site"
            icon={<MdPersonAdd className="icon" />}
            cta
            onClick={onToggleMenu}
          />
        )
      }
      title={title}
      description={description}
      isToggleMenu={openMenu}
    />
  );
};

export default Home;
