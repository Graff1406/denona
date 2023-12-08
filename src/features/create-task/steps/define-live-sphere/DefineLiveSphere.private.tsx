import { FC, useState, useEffect, ChangeEvent } from "react";
import { useInView } from "react-intersection-observer";

// Component

import ListItem from "./ListItem.private";
import List from "./List.private";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";
import { useUserStore } from "@/features/auth";

// Entities

import {
  // addDocument,
  getDocuments,
  getDocumentsByIds,
} from "@/entities/firebase";
import { Sphere, SphereLangItem } from "@/entities/models";

// Shared

import { GENERATED_LIFE_SPHERES } from "@/shared/constants";
import { DeButton, DeSkeletonList, DeField } from "@/shared/ui";
import { createRandomId, getArrayFromString } from "@/shared/helpers";
import { useTranslations, useOnlineStatus, useLocale } from "@/shared/hooks";

// Data

// import { list } from "./data.ts";

interface Props {
  scrollDirectionY?: "down" | "up" | null;
  onChange?: (lifeSphere: Sphere | null) => void;
}

const LIMIT = 20;

const DefineLiveSphere: FC<Props> = ({ scrollDirectionY, onChange }) => {
  // Use

  const { $t } = useTranslations();
  const { appIsOnline } = useOnlineStatus();
  const [ref, inView] = useInView({});
  const { locale } = useLocale();
  const { user } = useUserStore();

  // State

  const [lifeSpheres, setLifeSpheres] = useState<Sphere[]>([]);
  const [filteredLifeSpheres, setFilteredLifeSpheres] = useState<Sphere[]>([]);
  const [inProgressSpheres, setInProgressSpheres] = useState<Sphere[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [choseSL, setChoseSL] = useState<
    (SphereLangItem & { id: string }) | null
  >(null);
  const [loadingResGPT, setLoadingResGPT] = useState(false);
  const [loadingListLifeSpheres, setLoadingListLifeSpheres] = useState(true);
  const [loadingInProgressSpheres, setLoadingInProgressSpheres] =
    useState(true);

  //  Method

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  const handleChooseSL = (id: string) => {
    let sphere = null;
    if (choseSL?.id !== id) {
      const spheres = [...lifeSpheres, ...inProgressSpheres];
      sphere =
        spheres.find((sphere) => sphere.id === id) ?? (null as Sphere | null);
    }

    setChoseSL(sphere as (SphereLangItem & { id: string }) | null);
    if (onChange) onChange(sphere);
  };

  const filteredBySearch = () => {
    const filtered = lifeSpheres.filter((item) =>
      Object.values(item[locale.code]).some((item) =>
        item.toLowerCase().trim().includes(filterValue.toLowerCase().trim())
      )
    );
    setFilteredLifeSpheres(filtered);
  };

  const handleCreateOwnLS = async () => {
    try {
      if (filterValue.length > 3) {
        setLoadingResGPT(true);
        const prompt = generatePrompt("lifeSphere", {
          length: 1,
          value: filterValue.trim(),
        });
        const res = await askGPT({ content: prompt, max_tokens: 1000 });
        if (res.content) {
          const items = getArrayFromString<Sphere>(res.content)?.map((s) => ({
            ...s,
            id: createRandomId(),
          })) as Sphere[];
          if (items.length) setLifeSpheres(items);
        }
        setLoadingResGPT(false);
        setFilterValue("");
      }
    } catch (e) {
      setLoadingResGPT(false);
    }
  };

  const getLifeSpheres = async (lastItem?: Sphere) => {
    try {
      const data = await getDocuments({
        collectionName: GENERATED_LIFE_SPHERES,
        isLimit: LIMIT,
        lastDocument: lastItem,
      });

      const filteredList = data.list.filter(
        (s) => !inProgressSpheres.some((ss) => ss.id === s.id)
      );
      if (lifeSpheres.length)
        setLifeSpheres((prev) => [...prev, ...filteredList]);
      else setLifeSpheres(filteredList);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingListLifeSpheres(false);
    }
  };

  const initSpheres = () => {
    const getInPLF = getDocumentsByIds({
      collectionName: GENERATED_LIFE_SPHERES,
      documentIds: user.auth?.inProgressLifeSpheres || [],
    }) as Promise<Sphere[]>;
    const getLS = getDocuments({
      collectionName: GENERATED_LIFE_SPHERES,
      isLimit: LIMIT,
    }) as Promise<{ size: number; list: Sphere[] }>;
    Promise.all([getLS, getInPLF])
      .then((items) => {
        const [list, inProgressList] = items;
        if (inProgressList.length) {
          const filtered = list.list.filter(
            (s) => !inProgressSpheres.some((ss) => s.id === ss.id)
          );

          setLifeSpheres(filtered);
          setInProgressSpheres(inProgressList);
        } else {
          setLifeSpheres(list.list);
        }
      })
      .finally(() => {
        setLoadingListLifeSpheres(false);
        setLoadingInProgressSpheres(false);
      });
  };

  // Hook

  useEffect(() => {
    filteredBySearch();
  }, [filterValue]);

  useEffect(() => {
    filteredBySearch();
  }, [lifeSpheres]);

  useEffect(() => {
    const lastItem = lifeSpheres[lifeSpheres.length - 1];

    if (inView && lastItem) {
      getLifeSpheres(lastItem);
    }
  }, [inView]);

  useEffect(() => {
    if (user.auth?.inProgressLifeSpheres?.length) {
      initSpheres();
    } else {
      setLoadingInProgressSpheres(false);
      getLifeSpheres();
    }
  }, []);

  return (
    <>
      {/* <DeButton label="Add to col" onClick={temporary} /> */}
      <div className="mb-8 w-full">
        <h2 className="mb-4">
          {$t.createTaskPageAddLifeSphereProggressListTitle}
        </h2>
        <DeSkeletonList loading={loadingInProgressSpheres} limit={5}>
          {!loadingInProgressSpheres && inProgressSpheres.length ? (
            <List items={inProgressSpheres}>
              {({ id, label, hint }) => (
                <ListItem
                  value={choseSL?.id ?? ""}
                  scrollDirectionY={scrollDirectionY}
                  key={id}
                  id={id}
                  label={label}
                  hint={hint}
                  onClick={handleChooseSL}
                />
              )}
            </List>
          ) : (
            <p className="p-3 bg-zinc-100 rounded-md">
              {$t.createTaskPageAddLifeSphereProggressListNoyetSpheres}
            </p>
          )}
        </DeSkeletonList>
      </div>
      {appIsOnline && (
        <div className="space-y-4 w-full mb-6 relative">
          <h2>{$t.createTaskPageAddLifeSphereCurrentListTitle}</h2>
          <div
            className={[
              "w-full z-10 flex flex-col tablet:items-center gap-4",
              !choseSL ? "sticky top-2" : "relative",
            ].join(" ")}
          >
            <DeField
              className="shadow-md"
              placeholder={
                $t.createTaskPageAddLifeSphereGenerateinputPlaceholder
              }
              area-label={$t.createTaskPageAddLifeSphereGenerateinputAreaLabel}
              title={$t.createTaskPageAddLifeSphereGenerateinputAreaLabel}
              value={filterValue}
              onChange={handleFilterChange}
            />
            {!filteredLifeSpheres.length && !loadingListLifeSpheres && (
              <DeButton
                label={$t.createTaskPageAddLifeSphereGenerateButtonLabel}
                areaLabel={
                  $t.createTaskPageAddLifeSphereGenerateButtonAreaLabel
                }
                className={["tablet:max-w-max"].join(" ")}
                loading={loadingResGPT}
                onClick={handleCreateOwnLS}
              />
            )}
          </div>

          {!loadingListLifeSpheres && filteredLifeSpheres.length ? (
            <List items={filteredLifeSpheres}>
              {({ id, label, hint }) => (
                <ListItem
                  value={choseSL?.id ?? ""}
                  scrollDirectionY={scrollDirectionY}
                  key={id}
                  id={id}
                  label={label}
                  hint={hint}
                  onClick={handleChooseSL}
                />
              )}
            </List>
          ) : (
            <p className="p-3 bg-zinc-100 rounded-md">
              {$t.createTaskPageAddLifeSphereProggressListNoyetSpheres}
            </p>
          )}

          <div ref={ref}>
            <DeSkeletonList
              className="relative"
              loading={loadingListLifeSpheres}
            ></DeSkeletonList>
          </div>
        </div>
      )}
    </>
  );
};

export default DefineLiveSphere;
