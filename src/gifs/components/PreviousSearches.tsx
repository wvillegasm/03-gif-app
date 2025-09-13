import { type FC } from "react";

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
  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => (
          <li key={search.id}>
            <button
              type="button"
              className="previous-search-item"
              onClick={() => onTermClicked(search.gifName)}
            >
              {search.gifName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
