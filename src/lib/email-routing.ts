const HOTEL = "royalphuketcity.com";

export type InquiryChannel =
  | "mice"
  | "wedding"
  | "rooms"
  | "yanlong"
  | "twist"
  | "spa"
  | "feedback";

export type EmailAssignment = {
  to: readonly string[];
  cc: readonly string[];
};

/**
 * Official Person-in-Charge assignment (To / CC) from the hotel email matrix.
 * Website channels on this site: MICE, wedding, rooms/contact, spa booking.
 * Yan Long / Twist rows are included so dining inquiries on this site can follow F&B.
 */
export const EMAIL_ASSIGNMENTS: Record<InquiryChannel, EmailAssignment> = {
  mice: {
    to: [`duanphen.k@${HOTEL}`],
    cc: [
      `sasithon.s@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
      `marketing@${HOTEL}`,
      `reservation@${HOTEL}`,
      `sales@${HOTEL}`,
    ],
  },
  wedding: {
    to: [`narin.r@${HOTEL}`],
    cc: [
      `sasithon.s@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
      `marketing@${HOTEL}`,
      `sales@${HOTEL}`,
      `reservation@${HOTEL}`,
    ],
  },
  rooms: {
    to: [`reservation@${HOTEL}`],
    cc: [
      `sasithon.s@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
      `marketing@${HOTEL}`,
      `payao.r@${HOTEL}`,
      `sukon.s@${HOTEL}`,
    ],
  },
  feedback: {
    to: [`sasithon.s@${HOTEL}`],
    cc: [
      `reservation@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
      `marketing@${HOTEL}`,
      `sales@${HOTEL}`,
      `sukon.s@${HOTEL}`,
    ],
  },
  yanlong: {
    to: [`sukon.s@${HOTEL}`, `siriyaporn.s@${HOTEL}`],
    cc: [
      `sasithon.s@${HOTEL}`,
      `payao.r@${HOTEL}`,
      `sales@${HOTEL}`,
      `marketing@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
    ],
  },
  twist: {
    to: [`sukon.s@${HOTEL}`],
    cc: [
      `sasithon.s@${HOTEL}`,
      `payao.r@${HOTEL}`,
      `sales@${HOTEL}`,
      `marketing@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
    ],
  },
  spa: {
    to: ["wallop.c@royalwellnessspaphuket.com"],
    cc: [
      `reservation@${HOTEL}`,
      `sasithon.s@${HOTEL}`,
      `marketing@${HOTEL}`,
      `sales@${HOTEL}`,
      `puttipop.l@${HOTEL}`,
      `gm@${HOTEL}`,
    ],
  },
};

export function assignmentForInquiryType(
  inquiryType: string | undefined
): EmailAssignment {
  switch (inquiryType) {
    case "event":
    case "corporate":
      return EMAIL_ASSIGNMENTS.mice;
    case "wedding":
      return EMAIL_ASSIGNMENTS.wedding;
    case "dining":
    case "yanlong":
      return EMAIL_ASSIGNMENTS.yanlong;
    case "twist":
      return EMAIL_ASSIGNMENTS.twist;
    case "spa":
      return EMAIL_ASSIGNMENTS.spa;
    case "feedback":
    case "guest_chat":
      return inquiryType === "feedback"
        ? EMAIL_ASSIGNMENTS.feedback
        : EMAIL_ASSIGNMENTS.rooms;
    default:
      return EMAIL_ASSIGNMENTS.rooms;
  }
}

export function primaryMailbox(assignment: EmailAssignment): string {
  return assignment.to[0];
}
