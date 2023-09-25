import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Help: FC = () => {
  const location = useLocation();

  const Section: FC<{ id: string }> = ({ id }) => (
    <section id={id} className="p-3">
      <h2 className="font-semibold text-lg space-x-2">
        <Link
          to={location}
          className="text-primary hover:underline underline-offset-2 font-semibold"
        >
          #
        </Link>
        <span>{id}</span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
        dignissimos. Odio blanditiis commodi, vel fuga, incidunt magni iusto
        ipsa iure debitis, eaque quas praesentium illo nemo recusandae corporis
        nulla expedita.
      </p>
    </section>
  );

  useEffect(() => {
    const pageWrapper = document.querySelector("#page-wrapper");

    const handleScroll = () => {
      const targetId = location.hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement && pageWrapper) {
        pageWrapper.scrollTo({
          behavior: "smooth",
          top: targetElement.offsetTop - 15,
        });
      }
    };

    handleScroll();

    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [location]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Help Page</h1>

      <Link to="/help#section-1" className="link">
        home
      </Link>

      <Link to="/help#section-2" className="link">
        home
      </Link>

      <Link to="/help#section-3" className="link">
        home
      </Link>

      {Array.from({ length: 3 }).map((_el, i: number) => (
        <Section id={`section-${i + 1}`} />
      ))}
    </div>
  );
};

export default Help;
