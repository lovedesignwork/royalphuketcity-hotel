type SearchGroup = {
  title: string;
  page: string;
  queries: ReadonlyArray<readonly [query: string, page?: string]>;
};

export const prioritySearches: readonly SearchGroup[] = [
  {
    title: "Hotel stays",
    page: "/phuket-old-town-hotel",
    queries: [
      ["Phuket Town Hotel"],
      ["Hotel in Phuket Town"],
      ["The Best Hotel in Phuket Town", "/best-hotel-phuket-town"],
      ["Best hotel in Phuket Town", "/best-hotel-phuket-town"],
      ["Hotel near Phuket Old Town"],
      ["Hotel Phuket Old Town"],
      ["Hotel in Phuket Town with a pool", "/hotel-with-pool-phuket-town"],
      ["Family hotel in Phuket Town", "/family-hotel-phuket"],
      ["Where to stay in Phuket Old Town"],
      ["Hotel in Phuket City Center", "/phuket-city-center-hotel"],
      ["โรงแรมในตัวเมืองภูเก็ต"],
    ],
  },
  {
    title: "Meetings and events",
    page: "/meeting-events",
    queries: [
      ["Meeting Venue in Phuket"],
      ["Meeting Venue in Phuket Town"],
      ["Meeting room Phuket"],
      ["Hotel meeting room in Phuket Town"],
      ["Conference venue in Phuket", "/meeting-events/corporate-conference"],
      ["Hotel ballroom for events in Phuket Town", "/meeting-events#room-capacities"],
      ["ห้องประชุมโรงแรม ภูเก็ต"],
    ],
  },
  {
    title: "Weddings",
    page: "/wedding-venues",
    queries: [
      ["Wedding Venue Phuket"],
      ["Wedding Venue Phuket Town"],
      ["Wedding venue in Phuket Town"],
      ["Phuket wedding venues"],
      ["Wedding in Phuket"],
      ["Hotel wedding venue in Phuket Town"],
      ["Wedding banquet venues"],
      ["Wedding venues in Phuket Thailand"],
      ["Phuket wedding packages"],
      ["Phuket wedding packages 2027"],
      ["Rooftop wedding reception in Phuket"],
      ["สถานที่จัดงานแต่งงาน ภูเก็ต"],
    ],
  },
];
