import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Royal Phuket City Hotel - Luxury 4-Star Hotel in Phuket Old Town";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF8F5",
          backgroundImage: "linear-gradient(135deg, #FAF8F5 0%, #F0EDE8 100%)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#8B7355",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          {/* Hotel name */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "serif",
              letterSpacing: "-1px",
            }}
          >
            Royal Phuket City Hotel
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#8B7355",
              textAlign: "center",
              marginBottom: "40px",
              fontFamily: "serif",
              fontStyle: "italic",
            }}
          >
            Heritage Hospitality at Its Finest
          </p>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "2px",
              backgroundColor: "#8B7355",
              marginBottom: "40px",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontSize: "24px",
              color: "#666",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            Luxury 4-Star Hotel in Phuket Old Town • 251 Rooms • 5 Dining Venues
          </p>
        </div>

        {/* Bottom info bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            color: "#666",
            fontSize: "18px",
          }}
        >
          <span>★★★★ 4-Star Hotel</span>
          <span>•</span>
          <span>Phuket, Thailand</span>
          <span>•</span>
          <span>royalphuketcity.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
