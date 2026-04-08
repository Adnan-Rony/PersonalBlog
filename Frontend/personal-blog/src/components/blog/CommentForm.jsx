const CommentForm = ({ inputData, onChange, onSubmit, submitting, disabled }) => (
  <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <textarea
      value={inputData}
      onChange={onChange}
      placeholder={disabled ? "Sign in to leave a comment..." : "Share your thoughts..."}
      rows={3}
      required
      disabled={disabled}
      style={{
        width: "100%", background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12,
        padding: "12px 16px", color: "#e8e6e1", fontSize: "0.9rem",
        fontFamily: "'DM Sans',sans-serif", resize: "vertical",
        outline: "none", transition: "border-color 0.2s",
        opacity: disabled ? 0.5 : 1,
      }}
      onFocus={e => !disabled && (e.target.style.borderColor = "rgba(249,115,22,0.45)")}
      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
    />
    <button
      type="submit"
      disabled={!inputData.trim() || submitting || disabled}
      style={{
        alignSelf: "flex-start", padding: "9px 22px", borderRadius: 100,
        background: !inputData.trim() || submitting || disabled
          ? "rgba(255,255,255,0.06)"
          : "linear-gradient(135deg,#f97316,#ea580c)",
        color: !inputData.trim() || submitting || disabled ? "#6b6b80" : "#fff",
        border: "none", cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.85rem",
        transition: "all 0.2s",
      }}
    >
      {submitting ? "Submitting..." : "Post comment"}
    </button>
  </form>
);

export default CommentForm;
