import { FC, useState, useEffect, ChangeEvent } from "react";

// Feature

import { askGPT, generatePrompt } from "@/features/openai";

// Icons

import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { path } from "@/shared/constants";
import { DnButton } from "@/shared/ui";
import { getArrayFromString } from "@/shared/helpers";

interface Props {}

const DefineLiveSphere: FC<Props> = () => {
  return (
    <>
      <p>Create goal</p>
    </>
  );
};

export default DefineLiveSphere;
