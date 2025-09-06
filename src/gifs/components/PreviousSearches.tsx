interface Props {
  title: string;
  searches: { gifName: string; id: number }[];
  onSearch: (gifName: string) => void;
}

export const PreviousSearches: React.FC<Props> = ({
  title,
  searches,
  onSearch,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const gifName = target.dataset.gifname;
    if (gifName) {
      onSearch(gifName);
    }
  };

  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => (
          <li
            key={search.id}
            data-gifname={search.gifName}
            onClick={handleClick}
          >
            {search.gifName}
          </li>
        ))}
      </ul>
    </div>
  );
};
