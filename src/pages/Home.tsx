import { FC, useState } from "react";

// Shared

import { MainLayout } from "@/shared/layouts";
import { ZnButton } from "@/shared/ui";

// Icons

import { MdPersonAdd } from "react-icons/md";

const title = "What you focus on determines the quality of your life.";
const description = `The service should remind, help, suggest, guide in different situations. Keep the user within the chosen values, conform to an
acceptable philosophy, Facilitate following the chosen path.`;

const Home: FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const onToggleMenu = () => setOpenMenu(!openMenu);

  return (
    <MainLayout
      aside={
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
        <ZnButton
          className="tablet:hidden"
          label="Get started"
          areaLabel="Use the button for Access to the site"
          title="Get started to use the site"
          icon={<MdPersonAdd className="icon" />}
          cta
          onClick={onToggleMenu}
        />
      }
      title={title}
      description={description}
      isToggleMenu={openMenu}
    />
  );
};

export default Home;
