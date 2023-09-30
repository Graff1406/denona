import { FC } from "react";

// Shared

import { useTranslations } from "@/shared/hooks";
import { DeImage } from "@/shared/ui";

// Icons

const Home: FC = () => {
  // Use

  const { $t } = useTranslations();

  const blocks: { text: string; image: string }[] = [
    {
      text: $t.unAuthHomePageBlock_1,
      image: "/images/home_page_block_1.jpg",
    },
    {
      text: $t.unAuthHomePageBlock_2,
      image: "/images/home_page_block_2.jpg",
    },
    {
      text: $t.unAuthHomePageBlock_3,
      image: "/images/home_page_block_3.jpg",
    },
    {
      text: $t.unAuthHomePageBlock_4,
      image: "/images/home_page_block_4.jpg",
    },
    {
      text: $t.unAuthHomePageBlock_5,
      image: "/images/home_page_block_5.jpg",
    },
  ];

  return (
    <article className="tablet:p-6">
      <h1 className="text-center text-4xl tablet:text-5xl font-semibold mt-4 mb-10">
        {$t.homePageTitle}
      </h1>

      {blocks.map((el: { text: string; image: string }, i: number) => (
        <section
          key={i}
          className="py-8 flex flex-col flex-col-reverse tablet:flex-row gap-6 justify-between border-t border-zinc-200 dark:border-zinc-700"
        >
          <p className="grow-1">{el.text}</p>
          <div className="h-full w-full tablet:max-w-[100px] rounded">
            <DeImage
              src={el.image}
              alt="image for describe"
              className="w-full min-w-[100px]"
            />
          </div>
        </section>
      ))}
    </article>
  );
};

export default Home;
