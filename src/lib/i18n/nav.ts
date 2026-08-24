import type { Dictionary } from "./messages";

export function getNavLinks(t: Dictionary) {
  return {
    left: [
      { label: t.nav.home, href: "/" },
      {
        label: t.nav.rooms,
        href: "/rooms-suites",
        dropdown: [
          { label: t.nav.allRooms, href: "/rooms-suites" },
          { label: t.nav.premierSuperior, href: "/rooms-suites/premier-superior" },
          { label: t.nav.premierSuperiorSea, href: "/rooms-suites/premier-superior-partial-sea-view" },
          { label: t.nav.premierDeluxe, href: "/rooms-suites/premier-deluxe" },
          { label: t.nav.premierDeluxeSea, href: "/rooms-suites/premier-deluxe-partial-sea-view" },
          { label: t.nav.suiteRoom, href: "/rooms-suites/suite-room" },
          { label: t.nav.executiveSuite, href: "/rooms-suites/executive-suite" },
        ],
      },
      { label: t.nav.promotions, href: "/promotions" },
      { label: t.nav.facilities, href: "/facilities" },
      {
        label: t.nav.wedding,
        href: "/wedding-venues",
        dropdown: [
          { label: t.nav.weddingVenues, href: "/wedding-venues" },
          { label: t.nav.engagement, href: "/wedding-venues/engagement-ceremony" },
          { label: t.nav.thaiWedding, href: "/wedding-venues/thai-wedding" },
          { label: t.nav.chineseWedding, href: "/wedding-venues/chinese-wedding" },
          { label: t.nav.muslimWedding, href: "/wedding-venues/muslim-wedding" },
          { label: t.nav.westernWedding, href: "/wedding-venues/western-wedding" },
          { label: t.nav.lgbtqWedding, href: "/wedding-venues/lgbtq-wedding" },
        ],
      },
    ],
    right: [
      {
        label: t.nav.meeting,
        href: "/meeting-events",
        dropdown: [
          { label: t.nav.allVenues, href: "/meeting-events" },
          { label: t.nav.corporate, href: "/meeting-events/corporate-conference" },
          { label: t.nav.seminar, href: "/meeting-events/seminar-workshop" },
          { label: t.nav.productLaunch, href: "/meeting-events/product-launch" },
          { label: t.nav.gala, href: "/meeting-events/gala-dinner-award" },
          { label: t.nav.exhibition, href: "/meeting-events/exhibition-trade-show" },
          { label: t.nav.concert, href: "/meeting-events/concert-live-performance" },
          { label: t.nav.comedy, href: "/meeting-events/stand-up-comedy" },
          { label: t.nav.talkShow, href: "/meeting-events/talk-show-panel" },
          { label: t.nav.graduation, href: "/meeting-events/graduation-ceremony" },
          { label: t.nav.factSheets, href: "/download-fact-sheets" },
        ],
      },
      {
        label: t.nav.dining,
        href: "/dining",
        dropdown: [
          { label: t.nav.yanLong, href: "/yan-long-chinese-restaurant" },
          { label: t.nav.twist, href: "/twist-rooftop-restaurant-bar" },
        ],
      },
      {
        label: t.nav.about,
        href: "#",
        dropdown: [
          { label: t.nav.artist, href: "/artist" },
          { label: t.nav.royalGreen, href: "/royal-green" },
          { label: t.nav.sustainability, href: "/sustainability" },
        ],
      },
      { label: t.nav.contact, href: "/contact" },
    ],
  };
}
