import { FC, useState, useEffect, ChangeEvent } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Icons

import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { path } from "@/shared/constants";
import { DnButton } from "@/shared/ui";
import { getArrayFromString } from "@/shared/helpers";

interface Props {
  scrollDirectionY?: "down" | "up" | null;
  onChange?: (SL: string) => void;
}

const DefineLiveSphere: FC<Props> = ({ scrollDirectionY, onChange }) => {
  const lifeAreas: { id: string; label: string; hint: string }[] = [
    {
      id: "OU0BizsXPC",
      label: "Спорт и физическая активность",
      hint: "Занятия спортом, физическая активность и физическая форма.",
    },
    {
      id: "QEbNa442RN",
      label: "Психологическое здоровье",
      hint: "Здоровье ума, эмоциональное состояние, стресс и управление эмоциями.",
    },
    {
      id: "97XrqMjpez",
      label: "Семья и отношения",
      hint: "Отношения с членами семьи, партнерами, друзьями и коллегами.",
    },
    {
      id: "PP5aemWEdJ",
      label: "Духовное развитие",
      hint: "Личная вера, духовные практики, поиск смысла жизни.",
    },
    {
      id: "C8Cx2RN42s",
      label: "Профессиональная карьера",
      hint: "Работа, карьера, развитие профессиональных навыков.",
    },
    {
      id: "GkMusHsLSQ",
      label: "Финансы",
      hint: "Управление финансами, бюджетирование, инвестиции.",
    },
    {
      id: "P4DaG4LgZZ",
      label: "Личное развитие",
      hint: "Образование, саморазвитие, учеба новым навыкам.",
    },
    {
      id: "7vdsheL5uW",
      label: "Развлечения и хобби",
      hint: "Пасмурные увлечения, хобби, отдых и развлечения.",
    },
    { id: "WpZF5n8Hvs", label: "Языки", hint: "Изучение иностранных языков." },
    {
      id: "PIYOJxqHfk",
      label: "Социальная активность",
      hint: "Участие в общественных мероприятиях, волонтёрство, социальное взаимодействие.",
    },
    {
      id: "1UbYw5Eb5A",
      label: "Экологическое сознание",
      hint: "Забота о окружающей среде, устойчивость и экологические вопросы.",
    },
    {
      id: "BpJYG5j509",
      label: "Жилищные условия",
      hint: "Дом, место проживания, комфорт и безопасность.",
    },
    {
      id: "eKccQza1ze",
      label: "Путешествия и приключения",
      hint: "Путешествия, исследование мира, новые культуры и впечатления.",
    },
    {
      id: "H2Nsxbj5YB",
      label: "Креативность и искусство",
      hint: "Творчество, искусство, музыка и художественные увлечения.",
    },
    {
      id: "pLFNawhSkF",
      label: "Технологии и инновации",
      hint: "Технологические достижения, цифровые навыки и использование современных технологий.",
    },
    {
      id: "S8r0uo3Noq",
      label: "Питание и кулинария",
      hint: "Вкус и кулинарные навыки.",
    },
    {
      id: "Kmloub1nQG",
      label: "Медиа и информация",
      hint: "Новости, медиа, доступ к информации.",
    },
    {
      id: "xpunq8Pm2G",
      label: "Безопасность",
      hint: "Физическая безопасность, личная безопасность и защита.",
    },
    {
      id: "bxl9P5SPx9",
      label: "Психосоциальное благополучие",
      hint: "Психосоциальное уравновешивание, гармония в жизни.",
    },
    {
      id: "ZSVvFKa01N",
      label: "Интеллектуальное развитие",
      hint: "Развитие умственных способностей, обучение и умственная активность.",
    },
    {
      id: "utj7T15BId",
      label: "Религия и духовность",
      hint: "Религиозные убеждения и духовные практики.",
    },
    {
      id: "11DhYy6TZk",
      label: "Политика и общественная деятельность",
      hint: "Участие в политической и общественной жизни, активизм и гражданская активность.",
    },
    {
      id: "PGVKXYfZMm",
      label: "Научные исследования",
      hint: "Исследования и научная деятельность.",
    },
    {
      id: "GsquiDFqno",
      label: "Межличностные навыки",
      hint: "Общение, коммуникация и развитие навыков общения.",
    },
    {
      id: "CyeaNVGUhE",
      label: "Дизайн и стиль",
      hint: "Дизайн, стиль и визуальное восприятие.",
    },
    {
      id: "h7KemBhZuN",
      label: "Работа с техникой и ремонт",
      hint: "Навыки работы с техникой и ремонт дома.",
    },
    {
      id: "pG828u5bV4",
      label: "Творческое письмо и литература",
      hint: "Литературное творчество, писательская деятельность и литературное искусство.",
    },
    {
      id: "e85KJuUGJs",
      label: "Родительство",
      hint: "Забота о детях, воспитание и семейная жизнь.",
    },
    {
      id: "t4FaIBk0TX",
      label: "Планирование и организация",
      hint: "Планирование времени, задач и организация деятельности.",
    },
    {
      id: "Y7mB04tYMc",
      label: "Игры и развлечения с детьми",
      hint: "Игры и развлечения с детьми, семейное время.",
    },
    {
      id: "YDeaUtNZKy",
      label: "Природа и окружающая среда",
      hint: "Время, проведенное на свежем воздухе, забота о природе.",
    },
    {
      id: "TKzvr9ToZ6",
      label: "Животные и домашние питомцы",
      hint: "Забота о домашних животных, питомцы и их благополучие.",
    },
    {
      id: "0k40UUe7Ct",
      label: "Гражданские и юридические вопросы",
      hint: "Понимание юридических вопросов и гражданские права.",
    },
    {
      id: "CVGjz6Twxg",
      label: "Интерьер и декор",
      hint: "Дизайн интерьера, декорирование дома и уюта.",
    },
    {
      id: "u6RNqDJ9Oj",
      label: "Автомобили и мотоциклы",
      hint: "Уход за автотранспортом, вождение и мотоспорт.",
    },
    {
      id: "h9ItG3kTQg",
      label: "Индивидуальная свобода",
      hint: "Права и свободы, самоопределение и независимость.",
    },
    {
      id: "KGHJ8TJoMC",
      label: "Военная служба",
      hint: "Служба в армии, оборона и национальная безопасность.",
    },
    {
      id: "lgdq27cR95",
      label: "Космос и астрономия",
      hint: "Исследование космоса, астрономия и астрофизика.",
    },
    {
      id: "D7tPCresdV",
      label: "Исследование подводного мира",
      hint: "Подводные исследования, морская биология.",
    },
    {
      id: "0757ZLWW4j",
      label: "Рыбная ловля и рыболовство",
      hint: "Рыбалка, уход за аквариумом и рыбами.",
    },
    {
      id: "Y0AQkhroKL",
      label: "Декоративное искусство",
      hint: "Рисование, резьба по дереву и создание украшений.",
    },
    {
      id: "Jm1b2b3V2h",
      label: "Юмор и комедия",
      hint: "Юмор, стендап, комедийное искусство.",
    },
    {
      id: "jovhToPejt",
      label: "Паркур и акробатика",
      hint: "Спортивное паркур и акробатические трюки.",
    },
    {
      id: "x1tsYfQ4fC",
      label: "Медицинские исследования",
      hint: "Медицинская наука и исследования заболеваний.",
    },
    {
      id: "KnsenJK9g5",
      label: "Киберспорт и видеоигры",
      hint: "Профессиональный киберспорт и игровая индустрия.",
    },
    {
      id: "q93bfnx9gh",
      label: "Глобальные проблемы",
      hint: "Решение мировых проблем, активизм и глобальные инициативы.",
    },
    {
      id: "TdxpiDxJ1z",
      label: "Видеоблоггинг и контент",
      hint: "Создание видеоконтента и ведение видеоблога.",
    },
    {
      id: "WpM3Ens6IE",
      label: "Внутренний мир и медитация",
      hint: "Медитация, внутреннее самопознание и развитие.",
    },
    {
      id: "anqrJIYd9f",
      label: "Фестивали и мероприятия",
      hint: "Участие в фестивалях и различных мероприятиях.",
    },
    {
      id: "kZnpuXQvZ2",
      label: "Искусство массажа",
      hint: "Массаж, рефлексология и забота о физическом благополучии.",
    },
    {
      id: "9KITNzt84G",
      label: "Садоводство и огородничество",
      hint: "Уход за садом, выращивание растений и овощей.",
    },
    {
      id: "WTdi3rQhJt",
      label: "Обучение детей и воспитание",
      hint: "Родительство, образование и воспитание детей.",
    },
    {
      id: "tsbV40M0V1",
      label: "Комиксы и графические романы",
      hint: "Чтение комиксов и графических романов.",
    },
    {
      id: "TqPnPsuJ9M",
      label: "Татуировки и боди-арт",
      hint: "Татуировки, боди-арт и искусство татуировки.",
    },
    {
      id: "A2PqdJIn8f",
      label: "Фитнес и бодибилдинг",
      hint: "Здоровый образ жизни, тренировки и бодибилдинг.",
    },
    {
      id: "AHfRYlo2Hy",
      label: "Галереи и выставки",
      hint: "Посещение художественных галерей и выставок.",
    },
    {
      id: "e1OSkz2upL",
      label: "Шахматы и настольные игры",
      hint: "Игра в шахматы, настольные и бортовые игры.",
    },
    {
      id: "7g4aWQxrRO",
      label: "Кино и киноклубы",
      hint: "Просмотр фильмов и обсуждение в киноклубах.",
    },
    {
      id: "qjZCmR7qRa",
      label: "Ретро-техника и коллекционирование",
      hint: "Сбор и реставрация старой техники.",
    },
    {
      id: "jPwOyGeUB2",
      label: "Волонтерство и благотворительность",
      hint: "Добровольная помощь и благотворительные акции.",
    },
    {
      id: "xvj4T53eLZ",
      label: "Магия и оккультизм",
      hint: "Изучение магии, эзотерики и оккультизма.",
    },
    {
      id: "oUbNVs8x2s",
      label: "Зоопарки и зоология",
      hint: "Посещение зоопарков и изучение животного мира.",
    },
    {
      id: "Qtc4wZEMY2",
      label: "Исследование пещер и подземелий",
      hint: "Спелеология и исследование подземных пространств.",
    },
    {
      id: "qulo4hg672",
      label: "Историческая реконструкция",
      hint: "Реконструкция исторических событий и эпох.",
    },
    {
      id: "pSp9YFjPr4",
      label: "Экстрим и экстремальные виды спорта",
      hint: "Экстремальные виды спорта и приключения.",
    },
    {
      id: "aTd3RH3aHq",
      label: "Воздухоплавание и парапланеризм",
      hint: "Полеты на воздушных шарах и парапланах.",
    },
    {
      id: "b5Gloc7f2o",
      label: "Спортивные соревнования и марафоны",
      hint: "Участие в спортивных соревнованиях и марафонах.",
    },
    {
      id: "6l8TAQk2As",
      label: "Архитектурное творчество",
      hint: "Проектирование и строительство архитектурных объектов.",
    },
    {
      id: "k12jGUVNPO",
      label: "Военно-исторические реконструкции",
      hint: "Реконструкция военных событий и облика войны.",
    },
    {
      id: "SFw61kuU8r",
      label: "Поэзия и литературное творчество",
      hint: "Писательство, стихи и литературное творчество.",
    },
    {
      id: "gbarr73G9G",
      label: "Исследование загадок и тайн",
      hint: "Расследование загадок и нераскрытых тайн.",
    },
    {
      id: "26NB5wKlQx",
      label: "Изучение культур и языков",
      hint: "Изучение культур и иностранных языков.",
    },
    {
      id: "vCfqkqJkCQ",
      label: "Мировая кухня и гастрономия",
      hint: "Путешествие по мировой кухне и кулинарные эксперименты.",
    },
    {
      id: "54GLfYtIoY",
      label: "Социальные науки и исследования",
      hint: "Исследования общества, социология и психология.",
    },
    {
      id: "7bxTQUrzjQ",
      label: "Фотография и фотоклубы",
      hint: "Фотография и участие в фотоклубах.",
    },
    {
      id: "rHgSr2RSy2",
      label: "Шитье и рукоделие",
      hint: "Изготовление одежды и ручные работы.",
    },
    {
      id: "K0f5lwgO0X",
      label: "Флористика и декорирование",
      hint: "Создание букетов и декорирование интерьера.",
    },
    {
      id: "kPEB3k25Oo",
      label: "Верховая езда",
      hint: "Уход за лошадьми и верховая езда.",
    },
    {
      id: "L2b5qYkzlD",
      label: "Макраме и плетение бисером",
      hint: "Изготовление украшений и предметов интерьера.",
    },
    {
      id: "jKcc7fHgR0",
      label: "Горные лыжи и сноуборд",
      hint: "Катание на лыжах и сноуборде.",
    },
    {
      id: "MQh2gX4uCo",
      label: "Археология и раскопки",
      hint: "Исследование и раскопки археологических находок.",
    },
    {
      id: "mR3BdmP00H",
      label: "Планирование путешествий и туризм",
      hint: "Путешествия и планирование маршрутов.",
    },
    {
      id: "extInkCtis",
      label: "Робототехника и дроны",
      hint: "Создание и программирование роботов и дронов.",
    },
    {
      id: "rjqjL5meHf",
      label: "Экология и охрана природы",
      hint: "Защита окружающей среды и экологические исследования.",
    },
    {
      id: "QajMiL9V0U",
      label: "Творчество с детьми",
      hint: "Развивающие игры и занятия с детьми.",
    },
    {
      id: "w01NlFM37o",
      label: "Игра на музыкальных инструментах",
      hint: "Игра на гитаре, фортепиано и других инструментах.",
    },
    {
      id: "za84BLs01d",
      label: "Медитация и йога",
      hint: "Практика медитации и йоги для психофизического здоровья.",
    },
    {
      id: "Cq4GEOdOqU",
      label: "Реклама и маркетинг",
      hint: "Разработка рекламных кампаний и маркетинговые исследования.",
    },
    {
      id: "WvD0lo0EJe",
      label: "Личная финансовая грамотность",
      hint: "Управление финансами и инвестиции.",
    },
    {
      id: "xoU5uny0VX",
      label: "Поиск сокровищ и металлодетекторы",
      hint: "Поиск кладов и артефактов с помощью металлодетекторов.",
    },
  ];

  // State

  const [filteredArray, setFilteredArray] = useState(lifeAreas);
  const [filterValue, setFilterValue] = useState("");
  const [choseSL, setChoseSL] = useState("");
  const [loadingResGPT, setLoadingResGPT] = useState(false);
  // const [choseSLitemPosition, setChoseSLitemPosition] = useState(0);
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };
  const handleChooseSL = (SL: string) => {
    const value = choseSL === SL ? "" : SL;
    setChoseSL(value);
    if (onChange) onChange(value);

    // const clickedElement = e.currentTarget as HTMLElement;
    // const positionFromTop = clickedElement.offsetTop;
    // setChoseSLitemPosition(positionFromTop);
  };
  const handleCreateOwnLS = async () => {
    if (filterValue.length > 3) {
      const prompt = generatePrompt("lifeSphere", {
        length: 5,
        value: filterValue.trim(),
      });
      console.log(prompt);

      // return;
      // setLoadingResGPT(true);
      // const res = await askGPT({ content: prompt });
      // if (res.content) {
      //   const items = getArrayFromString(res.content);
      //   if (items.length) setFilteredArray(items);
      // }
      // setLoadingResGPT(false);
    }
  };

  useEffect(() => {
    const filtered = lifeAreas.filter((item) =>
      Object.values(item).some((item) =>
        item.toLowerCase().trim().includes(filterValue.toLowerCase().trim())
      )
    );
    setFilteredArray(filtered);
  }, [filterValue]);
  return (
    <>
      <div className="w-full">
        <h2 className="mb-4">Сферы жизны находящиейся в прогрессе</h2>
        <ul>
          {lifeAreas
            .filter((_e, i) => i < 4)
            .map((el) => (
              <li
                key={el.label}
                className={[
                  "flex border p-2 my-2 rounded-md cursor-pointer animation",
                  choseSL && el.label === choseSL
                    ? "bg-yellow-700 text-white border-yellow-800 shadow-md"
                    : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:border dark:border-zinc-700",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex flex-col items-center justify-center px-2 max-w-max",
                    choseSL && el.label === choseSL
                      ? "text-white"
                      : "text-zinc-500",
                  ].join(" ")}
                >
                  <MdCheckCircle className="h-4 w-4 text-blue-500" />
                  <Link to={path.home} className="link text-xs font-semibold">
                    100 tasks
                  </Link>
                </div>
                <div className="grow">
                  <p className="font-semibold">{el.label}</p>
                  <p className="text-xs">{el.hint}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="space-y-4 w-full mb-6">
        <h2>Выбери сферу жизни которую желаешь развивать</h2>
        <div
          className={[
            "w-full z-10 flex flex-col tablet:items-center gap-4",
            !choseSL.length ? "sticky top-2" : "relative",
          ].join(" ")}
        >
          <input
            type="text"
            placeholder="Найти свою сферу жизни"
            className="border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 px-4 py-3 w-full rounded-md shadow-md"
            value={filterValue}
            onChange={handleFilterChange}
          />
          <DnButton
            label="Generate life spheres"
            areaLabel="Use from input"
            className={[
              "tablet:max-w-max",
              filteredArray.length > 0
                ? "invisible max-h-0 opacity-0"
                : "visible max-h-60 opacity-100",
            ].join(" ")}
            loading={loadingResGPT}
            onClick={handleCreateOwnLS}
          />
        </div>
        <ul className="w-full h-full relative">
          {filteredArray.map((el) => (
            <li
              key={el.id}
              className={[
                "flex border p-2 my-2 rounded-md cursor-pointer animation",
                choseSL && el.label === choseSL
                  ? "bg-yellow-700 text-white border-yellow-800 shadow-md sticky"
                  : "bg-zinc-100  border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:border dark:border-zinc-700",
                scrollDirectionY === "down" ? " top-3" : "bottom-20",
              ].join(" ")}
              onClick={() => handleChooseSL(el.label)}
            >
              <div
                className={[
                  "flex items-center px-2 animation",
                  choseSL && el.label === choseSL ? "w-10" : "w-0",
                ].join(" ")}
              >
                <MdCheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="grow">
                <p className="font-semibold">{el.label}</p>
                <p className="text-xs">{el.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DefineLiveSphere;
