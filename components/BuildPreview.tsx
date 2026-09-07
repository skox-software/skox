"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { builds, type BuildType } from "@/content/landing";

/**
 * Controlled by `BuildSection`, which shares this selection with the build
 * cards below it — picking a build in either place moves the other.
 */
export function BuildPreview({
  selected,
  onSelect,
}: {
  selected: BuildType;
  onSelect: (id: BuildType) => void;
}) {
  const [period, setPeriod] = useState("Week");
  const [approved, setApproved] = useState(false);
  const [siteView, setSiteView] = useState("Home");
  const build = builds.find((item) => item.id === selected)!;
  function select(id: BuildType) {
    onSelect(id);
    track("build_preview_selected", { type: id });
  }
  return (
    <div className="build-preview" id="preview">
      <div className="preview-topline">
        <span className="micro">A little of what’s possible</span>
        <span className="preview-live">
          <i aria-hidden />
          Interactive — try it
        </span>
      </div>
      <div
        className="preview-tabs"
        role="tablist"
        aria-label="Explore example builds"
      >
        {builds.map((item, index) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={selected === item.id}
            aria-controls="build-panel"
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => select(item.id)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % builds.length;
              else if (event.key === "ArrowLeft")
                next = (index + builds.length - 1) % builds.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = builds.length - 1;
              else return;
              event.preventDefault();
              select(builds[next].id);
              document.getElementById(`tab-${builds[next].id}`)?.focus();
            }}
          >
            {item.label}
            <span aria-hidden>↗</span>
          </button>
        ))}
      </div>
      <div
        id="build-panel"
        className={`preview-window preview-${selected}`}
        role="tabpanel"
        aria-labelledby={`tab-${selected}`}
        tabIndex={0}
      >
        <div className="window-bar">
          <span className="window-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span>
            {selected === "dashboards"
              ? "Command Center"
              : selected === "web-apps"
                ? "Client workspace"
                : "Your next website"}
          </span>
          <span className="demo-badge">DEMO</span>
        </div>
        {selected === "dashboards" && (
          <div className="dashboard-demo">
            <div className="demo-heading">
              <div>
                <p className="demo-muted">THE BIG PICTURE</p>
                <h3>Business overview</h3>
              </div>
              <div
                className="period-control"
                aria-label="Sample reporting period"
              >
                {["Week", "Month"].map((p) => (
                  <button
                    key={p}
                    aria-pressed={period === p}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="metric-grid">
              <div>
                <span>Revenue</span>
                <strong>{period === "Week" ? "$24,680" : "$98,720"}</strong>
                <small>Across all locations</small>
              </div>
              <div>
                <span>Bookings</span>
                <strong>{period === "Week" ? "142" : "568"}</strong>
                <small>One connected view</small>
              </div>
              <div>
                <span>Locations</span>
                <strong>03</strong>
                <small>Side by side</small>
              </div>
            </div>
            <div className="chart-heading">
              <strong>Revenue by location</strong>
              <span>
                <i /> Sample revenue
              </span>
            </div>
            <div
              className="chart"
              role="img"
              aria-label={`Illustrative ${period.toLowerCase()} revenue chart for three locations; sample data only`}
            >
              <div className="chart-y" aria-hidden>
                <span>{period === "Week" ? "$12k" : "$48k"}</span>
                <span>{period === "Week" ? "$6k" : "$24k"}</span>
                <span>$0</span>
              </div>
              <div className="chart-bars" aria-hidden>
                {[62, 88, 74].map((value, i) => (
                  <div className="chart-column" key={i}>
                    <div className="bar-pair">
                      <i style={{ height: `${value - 19}%` }} />
                      <i
                        style={{
                          height: `${period === "Week" ? value : value - 8 + i * 4}%`,
                        }}
                      />
                    </div>
                    <span>{["Downtown", "Northside", "Riverside"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="demo-bottom">
              <span>
                <i className="status-dot" />
                Payments. Bookings. One screen.
              </span>
              <span>03 sources</span>
            </div>
          </div>
        )}
        {selected === "web-apps" && (
          <div className="app-demo">
            <div className="demo-heading">
              <div>
                <p className="demo-muted">EVERYTHING IN ONE PLACE</p>
                <h3>Your project, moving.</h3>
              </div>
              <span className="avatar-letter">JD</span>
            </div>
            <div className="app-project">
              <div>
                <span className="demo-muted">WEBSITE REDESIGN</span>
                <h4>Ready for your review</h4>
              </div>
              <span className="project-label">In progress</span>
            </div>
            <div className="progress-track">
              <i />
            </div>
            <div className="app-milestones">
              <span>Scope agreed</span>
              <span>Design review</span>
              <span>Launch</span>
            </div>
            <div className="approval-card">
              <span className="file-icon" aria-hidden>
                ↗
              </span>
              <div>
                <strong>Homepage design</strong>
                <span>
                  {approved
                    ? "Approved. Ready for the next step."
                    : "A working preview, ready for your feedback."}
                </span>
              </div>
            </div>
            <button
              className="demo-action"
              onClick={() => {
                setApproved(!approved);
                track("app_demo_used");
              }}
            >
              {approved ? "Approved ✓ · Undo" : "Approve sample design →"}
            </button>
            <div className="demo-bottom">
              <span>Files, feedback and approvals together.</span>
            </div>
          </div>
        )}
        {selected === "websites" && (
          <div className="website-demo">
            <div className="sample-nav">
              <strong>
                FORM<span>®</span>
              </strong>
              <div>
                {["Home", "Services"].map((view) => (
                  <button
                    key={view}
                    aria-pressed={siteView === view}
                    onClick={() => setSiteView(view)}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
            <div className="sample-site-body">
              <span className="micro">A WEBSITE CONCEPT</span>
              <h3>
                {siteView === "Home" ? (
                  <>
                    Make room
                    <br />
                    for better.
                  </>
                ) : (
                  <>
                    Thoughtful spaces.
                    <br />
                    Made for living.
                  </>
                )}
              </h3>
              <p>
                {siteView === "Home"
                  ? "Considered spaces. Everyday living. A studio that sees the potential in your place."
                  : "Interior design, space planning and the details that make a space feel like yours."}
              </p>
              <button
                onClick={() =>
                  setSiteView(siteView === "Home" ? "Services" : "Home")
                }
              >
                {siteView === "Home"
                  ? "Explore the studio"
                  : "Back to the homepage"}{" "}
                <span aria-hidden>↗</span>
              </button>
            </div>
            <div className="architecture-art" aria-hidden>
              <div />
              <i />
              <span />
            </div>
            <div className="sample-site-footer">
              SPACES WITH PURPOSE. <span>DESIGNED AROUND YOU.</span>
            </div>
          </div>
        )}
      </div>
      <div className="preview-caption">
        <span>{build.previewCaption}</span>
      </div>
      <div className="preview-ticket">
        <span className="ticket-mark" aria-hidden>
          ✓
        </span>
        <div>
          <strong>Built for your business.</strong>
          <span>Your workflows. Your brand. Your code.</span>
        </div>
      </div>
    </div>
  );
}
