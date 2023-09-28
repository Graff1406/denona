import { useEffect, useState } from "react";
import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import { Link } from "react-router-dom";

interface LinkNode {
  type: "tag";
  name: "a";
  attribs: { href: string };
  children: Node[];
}

type Node = LinkNode | string;

const ServerHTML = ({ htmlString }: { htmlString: string }) => {
  const [processedHTML, setProcessedHTML] = useState<
    string | JSX.Element | JSX.Element[] | undefined
  >();

  const replace: HTMLReactParserOptions["replace"] = (node: any) => {
    if (node.type === "tag" && node.name === "a" && node.attribs.href) {
      return (
        <Link to={node.attribs.href} className="link">
          {domToReact(node.children)}
        </Link>
      );
    }
    return node;
  };

  const parsedHtml = parse(htmlString, { replace });

  useEffect(() => {
    setProcessedHTML(parsedHtml);
  }, [htmlString]);

  return <div className="space-y-3">{processedHTML}</div>;
};

export default ServerHTML;
