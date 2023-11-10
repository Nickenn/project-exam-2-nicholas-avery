interface IVenue {
  id: number;
  name: string;
  price: number;
  maxGuests: number;
}

interface IVenueListProps {
  venues: IVenue[];
}

function VenueList({ venues }: IVenueListProps) {
  const singleVenue = venues.map((venue) => {
    const { id, name, price, maxGuests } = venue;

    return (
      <div key={id}>
        <div>
          <h2>{name}</h2>
          <p>{price}</p>
          <p>{maxGuests}</p>
        </div>
      </div>
    );
  });

  return <section>{singleVenue}</section>;
}

export default VenueList;
