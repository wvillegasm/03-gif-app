import { type FC, type MouseEvent } from "react";

interface Props {
  title: string;
  searches: { gifName: string; id: string }[];
  onTermClicked: (gifName: string) => void;
}

export const PreviousSearches: FC<Props> = ({
  title,
  searches,
  onTermClicked,
}) => {
  const onHandleClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement;
    const gifName = target.dataset.gifName;

    if (gifName) {
      onTermClicked(gifName);
    }
  };

  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
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
