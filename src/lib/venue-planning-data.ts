export interface VenuePlanningGuideData {
  id: string;
  label: string;
  title: string;
  introduction: string;
  options: { title: string; description: string }[];
  briefTitle: string;
  briefItems: string[];
  questionsTitle: string;
  questions: { question: string; answer: string }[];
  links: { label: string; href: string }[];
}

// Use the existing venue pages, room table and hotel services as the source.
// Prices, package inclusions, exclusivity and date availability need a proposal.
export const WEDDING_PLANNING_GUIDE: VenuePlanningGuideData = {
  id: "wedding-planning",
  label: "Your celebration in Phuket Town",
  title: "Choose the Setting for Your Wedding in Phuket",
  introduction:
    "Royal Phuket City Hotel brings ceremony spaces, reception catering and guest rooms together on Phang-Nga Road in Phuket Town. Start with the parts of the day you want to host, then ask the wedding team to recommend a room and layout for your guest count.",
  options: [
    {
      title: "Ceremony and engagement",
      description:
        "Explore the Thai, Chinese, Western and other ceremony options below. Tell the team which traditions you want to include and whether the ceremony and reception will take place on the same day.",
    },
    {
      title: "Ballroom reception",
      description:
        "The Grand Ballroom has 1,637 sqm of space. Compare the published banquet layouts before choosing a guest count: dining tables, a stage, ceremony space and a dance floor each affect the final seating plan.",
    },
    {
      title: "Guest accommodation",
      description:
        "Keep visiting friends and family at the same hotel as the celebration. Include their stay dates and approximate room requirements in your enquiry so accommodation can be discussed alongside the event.",
    },
  ],
  briefTitle: "What to Include in Your Wedding Enquiry",
  briefItems: [
    "Preferred date, alternative dates and estimated guest count.",
    "Ceremony traditions, reception timing and preferred dining style.",
    "Budget range, décor ideas, entertainment and any outside suppliers.",
    "Guest room needs and dietary or accessibility requirements to discuss.",
  ],
  questionsTitle: "Wedding Venue Planning Questions",
  questions: [
    {
      question: "How many guests can attend a wedding reception?",
      answer:
        "Use the banquet columns in the meeting and function room table as a starting point. The ballroom's 2,300-person figure is for theatre seating, not a wedding dinner. Ask the team to confirm capacity for your tables, stage, dance floor and ceremony arrangements.",
    },
    {
      question: "What is included in a wedding package?",
      answer:
        "Request a proposal for your date, guest count and chosen ceremony. Ask for an itemised breakdown of venue use, menus, décor, sound and lighting, accommodation, taxes and any additional charges before comparing packages.",
    },
    {
      question: "Can we discuss catering and rooms together?",
      answer:
        "Yes. The hotel offers wedding catering and guest accommodation. Share your dining plans and stay dates with the wedding team, and ask them to specify the menus, room arrangements and availability in your proposal.",
    },
  ],
  links: [
    { label: "Request a wedding proposal", href: "#wedding-inquiry" },
    { label: "Compare reception layouts", href: "/meeting-events#room-capacities" },
    { label: "Explore rooms and suites", href: "/rooms-suites" },
  ],
};

export const MEETING_PLANNING_GUIDE: VenuePlanningGuideData = {
  id: "meeting-planning",
  label: "Plan around your programme",
  title: "Choose Your Phuket Meeting Venue Layout",
  introduction:
    "The hotel has 9 meeting rooms, with individual rooms and combined configurations listed in the capacity table. Match the seating style to your agenda before comparing capacities, then discuss catering, equipment and delegate accommodation with the events team.",
  options: [
    {
      title: "Boardroom discussions",
      description:
        "Compare Si-Rea and the boardroom or U-shape columns for smaller discussions. Include the number of participants, presentation needs and any private breakout sessions in your brief.",
    },
    {
      title: "Training and seminars",
      description:
        "Compare classroom layouts in Raya, the smaller meeting rooms and the ballroom configurations. Tell the team whether delegates need desks, group work areas, demonstrations or space for equipment.",
    },
    {
      title: "Conferences and banquets",
      description:
        "The 1,637 sqm Grand Ballroom is listed for up to 2,300 in theatre seating. Classroom, cocktail and banquet layouts have different capacities; allow for staging, production and catering when confirming your plan.",
    },
  ],
  briefTitle: "What to Include in Your Event Brief",
  briefItems: [
    "Event date, start and finish times, delegate count and agenda.",
    "Preferred seating layout, stage requirements and breakout rooms.",
    "Displays, microphones, presentation connections and technical support needs.",
    "Coffee breaks, meals, dietary requirements and overnight room needs.",
  ],
  questionsTitle: "Meeting and Conference Planning Questions",
  questions: [
    {
      question: "How should we compare meeting room capacities?",
      answer:
        "Use the column for your actual seating style. Theatre seating has no delegate desks; classroom, boardroom and banquet setups use space differently. The table includes combined rooms, so its rows are not a count of separate rooms available at the same time.",
    },
    {
      question: "What AV equipment and event services are available?",
      answer:
        "The hotel's service list includes projectors, display screens, microphones, sound systems, staging, catering and AV technician support. Share your equipment list and ask the team to confirm availability, room suitability and any charges in the proposal.",
    },
    {
      question: "Can the proposal include food and delegate accommodation?",
      answer:
        "Yes. Share your coffee-break and meal schedule, dietary requirements, stay dates and approximate room count. Ask for venue hire, equipment, catering, accommodation, taxes and additional services to be listed separately so you can compare the full event cost.",
    },
  ],
  links: [
    { label: "Request an event proposal", href: "#event-inquiry" },
    { label: "Compare room capacities", href: "#room-capacities" },
    { label: "View the floor plan", href: "#floor-plan" },
  ],
};
