import React, { useRef } from "react";

interface Props {
  title: string;
  searches: { gifName: string; id: string }[];
  onTermClicked: (gifName: string) => void;
}

export const PreviousSearches: React.FC<Props> = ({
  title,
  searches,
  onTermClicked,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const onHandleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement;
    const gifName = target.dataset.gifName;

    console.log(gifName);

    if (gifName) {
      onTermClicked(gifName);
    }
  };

  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list" ref={listRef}>
        {searches.map((search) => (
          <li
            key={search.id}
            data-gif-name={search.gifName}
            onClick={onHandleClick}
          >
            {search.gifName}
          </li>
        ))}
      </ul>
    </div>
  );
};
