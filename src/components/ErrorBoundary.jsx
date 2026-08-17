import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Still log to console so it shows up in DevTools too.
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          maxWidth: 780, margin: "60px auto", padding: 28,
          fontFamily: "system-ui, sans-serif", color: "#1a1a1a",
          background: "#fff5f5", border: "1px solid #ffb3b3", borderRadius: 12,
        }}>
          <h2 style={{ color: "#c8390b", marginTop: 0 }}>Something broke on this page</h2>
          <p>This is the actual error — screenshot this and send it back:</p>
          <pre style={{
            whiteSpace: "pre-wrap", background: "#1a1a1a", color: "#ff8a80",
            padding: 16, borderRadius: 8, fontSize: 13, overflowX: "auto",
          }}>
            {String(this.state.error && this.state.error.stack ? this.state.error.stack : this.state.error)}
          </pre>
          <button
            onClick={() => { this.setState({ error: null }); window.location.href = "/"; }}
            style={{
              marginTop: 16, padding: "10px 20px", borderRadius: 100, border: "none",
              background: "#0a1f3d", color: "#fff", fontWeight: 700, cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
