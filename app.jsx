import { useState, useMemo } from "react";


const SEED_STUDENTS = [
  { id: 1, name: "Aria Chen",    enrolledCourses: new Set(["Algorithms", "Linear Algebra", "ML Fundamentals"]), gpa: 3.92 },
  { id: 2, name: "Marcus Webb",  enrolledCourses: new Set(["Data Structures", "Algorithms", "Systems Design"]), gpa: 3.61 },
  { id: 3, name: "Priya Nair",   enrolledCourses: new Set(["ML Fundamentals", "Statistics", "Linear Algebra"]), gpa: 3.85 },
  { id: 4, name: "Leo Torres",   enrolledCourses: new Set(["Systems Design", "Networking", "Data Structures"]), gpa: 3.44 },
  { id: 5, name: "Sana Malik",   enrolledCourses: new Set(["Statistics", "ML Fundamentals", "Algorithms"]),    gpa: 3.78 },
];


const buildMap = (arr) => new Map(arr.map((s) => [s.id, s]));


const gpaColor = (gpa) => {
  if (gpa >= 3.8) return "#4ade80";
  if (gpa >= 3.5) return "#facc15";
  return "#fb923c";
};


const GPABar = ({ gpa }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{
      flex: 1, height: 6, background: "#1e293b", borderRadius: 99, overflow: "hidden",
    }}>
      <div style={{
        width: `${(gpa / 4) * 100}%`, height: "100%",
        background: gpaColor(gpa), borderRadius: 99,
        transition: "width .4s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: gpaColor(gpa), minWidth: 36 }}>
      {gpa.toFixed(2)}
    </span>
  </div>
);


export default function CourseEnrollmentDashboard() {
 
  const [studentMap, setStudentMap] = useState(() => buildMap(SEED_STUDENTS));
  const [nextId, setNextId]         = useState(6);
  const [filterCourse, setFilterCourse] = useState("");
  const [form, setForm] = useState({ name: "", courses: "", gpa: "" });
  const [formError, setFormError]   = useState("");
  const [removeAnim, setRemoveAnim] = useState(null);


  const allStudents = useMemo(() => [...studentMap.values()], [studentMap]);


  const allCourses = useMemo(
    () =>
      [...allStudents
        .reduce((acc, s) => {
          s.enrolledCourses.forEach((c) => acc.add(c));
          return acc;
        }, new Set())
      ].sort(),
    [allStudents]
  );


  const displayStudents = useMemo(() => {
    const sorted = [...allStudents].sort((a, b) => b.gpa - a.gpa);
    if (!filterCourse) return sorted;
    return sorted.filter((s) => s.enrolledCourses.has(filterCourse));
  }, [allStudents, filterCourse]);


  const avgGpa = useMemo(() =>
    allStudents.length
      ? (allStudents.reduce((s, x) => s + x.gpa, 0) / allStudents.length).toFixed(2)
      : "—",
    [allStudents]
  );


  const removeStudent = (id) => {
    setRemoveAnim(id);
    setTimeout(() => {
      setStudentMap((prev) => {
        const next = new Map([...prev]);          
        next.delete(id);
        return next;
      });
      setRemoveAnim(null);
    }, 300);
  };


  const addStudent = () => {
    setFormError("");
    const name    = form.name.trim();
    const gpa     = parseFloat(form.gpa);
    const courses = form.courses
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);


    if (!name)                        return setFormError("Name is required.");
    if (isNaN(gpa) || gpa < 0 || gpa > 4) return setFormError("GPA must be 0–4.");
    if (!courses.length)              return setFormError("Enter at least one course.");


    const newStudent = {
      id: nextId,
      name,
      enrolledCourses: new Set(courses),  
      gpa,
    };


   
    setStudentMap((prev) => new Map([...prev, [nextId, newStudent]]));
    setNextId((n) => n + 1);
    setForm({ name: "", courses: "", gpa: "" });
  };


  const css = {
    root: {
      minHeight: "100vh",
      background: "#020817",
      color: "#e2e8f0",
      fontFamily: "'Outfit', sans-serif",
      padding: "32px 24px 64px",
    },
    header: {
      textAlign: "center",
      marginBottom: 48,
    },
    title: {
      fontSize: "clamp(28px, 5vw, 52px)",
      fontWeight: 800,
      letterSpacing: "-1.5px",
      background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #38bdf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 6,
    },
    subtitle: { color: "#475569", fontSize: 14, letterSpacing: 1 },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16,
      marginBottom: 40,
      maxWidth: 900,
      margin: "0 auto 40px",
    },
    statCard: {
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    statVal: { fontSize: 32, fontWeight: 800, letterSpacing: "-1px" },
    statLabel: { fontSize: 11, color: "#475569", letterSpacing: 1.5, textTransform: "uppercase" },
    panel: {
      maxWidth: 900,
      margin: "0 auto 32px",
      background: "#0f172a",
      border: "1px solid #1e293b",
      borderRadius: 20,
      padding: "28px 28px",
    },
    panelTitle: {
      fontSize: 13, fontWeight: 700, letterSpacing: 2,
      textTransform: "uppercase", color: "#64748b", marginBottom: 18,
    },
    input: {
      background: "#020817", border: "1px solid #1e293b",
      borderRadius: 10, padding: "10px 14px",
      color: "#e2e8f0", fontSize: 14, fontFamily: "'Outfit', sans-serif",
      outline: "none", width: "100%", boxSizing: "border-box",
      transition: "border-color .2s",
    },
    btn: (accent = "#6366f1") => ({
      background: accent, border: "none", borderRadius: 10,
      padding: "10px 20px", color: "#fff", fontSize: 14, fontWeight: 700,
      cursor: "pointer", transition: "opacity .2s, transform .1s",
      letterSpacing: .5,
    }),
    courseChip: (active) => ({
      padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
      cursor: "pointer", border: "1px solid",
      borderColor: active ? "#818cf8" : "#1e293b",
      background: active ? "#818cf820" : "transparent",
      color: active ? "#818cf8" : "#64748b",
      transition: "all .15s",
    }),
    studentCard: (removing) => ({
      background: "#020817", border: "1px solid #1e293b",
      borderRadius: 16, padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 10,
      opacity: removing ? 0 : 1,
      transform: removing ? "scale(.96)" : "scale(1)",
      transition: "opacity .3s, transform .3s",
    }),
    badge: {
      padding: "3px 10px", borderRadius: 99,
      background: "#1e293b", color: "#94a3b8",
      fontSize: 11, fontWeight: 600,
    },
  };


  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />


      <div style={css.root}>
        {/* Header */}
        <div style={css.header}>
          <div style={css.title}>Enrollment Dashboard</div>
          <div style={css.subtitle}>Course · Student · GPA Analytics</div>
        </div>


        {/* Stats row */}
        <div style={css.grid}>
          {[
            { label: "Total Students", val: allStudents.length, color: "#818cf8" },
            { label: "Unique Courses",  val: allCourses.length,  color: "#38bdf8" },
            { label: "Average GPA",     val: avgGpa,             color: "#4ade80" },
            { label: "Showing",         val: displayStudents.length, color: "#facc15" },
          ].map(({ label, val, color }) => (
            <div key={label} style={css.statCard}>
              <div style={{ ...css.statVal, color }}>{val}</div>
              <div style={css.statLabel}>{label}</div>
            </div>
          ))}
        </div>


        {/* Add Student */}
        <div style={{ ...css.panel, maxWidth: 900, margin: "0 auto 28px" }}>
          <div style={css.panelTitle}>➕ Add New Student</div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr auto", gap: 12, alignItems: "end" }}>
            {[
              { key: "name",    placeholder: "Full name",              label: "Name" },
              { key: "courses", placeholder: "e.g. Algorithms, ML…",   label: "Courses (comma-separated)" },
              { key: "gpa",     placeholder: "0.00 – 4.00",            label: "GPA" },
            ].map(({ key, placeholder, label }) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, color: "#475569", letterSpacing: 1, textTransform: "uppercase" }}>{label}</label>
                <input
                  style={css.input}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                  onBlur={(e)  => (e.target.style.borderColor = "#1e293b")}
                  onKeyDown={(e) => e.key === "Enter" && addStudent()}
                />
              </div>
            ))}
            <button style={css.btn()} onClick={addStudent}
              onMouseEnter={(e) => (e.target.style.opacity = .8)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}>
              Add
            </button>
          </div>
          {formError && <div style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>⚠ {formError}</div>}
        </div>


        {/* Course Filter */}
        <div style={{ ...css.panel, maxWidth: 900, margin: "0 auto 28px" }}>
          <div style={css.panelTitle}>🎓 Filter by Course</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button style={css.courseChip(!filterCourse)}
              onClick={() => setFilterCourse("")}>
              All
            </button>
            {allCourses.map((c) => (
              <button key={c} style={css.courseChip(filterCourse === c)}
                onClick={() => setFilterCourse(filterCourse === c ? "" : c)}>
                {c}
              </button>
            ))}
          </div>
          {filterCourse && (
            <div style={{ marginTop: 14, fontSize: 12, color: "#475569" }}>
              <span style={{ color: "#818cf8", fontWeight: 700 }}>Time complexity: </span>
              O(n·k) — iterates over all <strong style={{ color: "#e2e8f0" }}>n</strong> students,
              each Set lookup is <strong style={{ color: "#e2e8f0" }}>O(1)</strong>, giving O(n) total.
              k = avg enrolled courses (affects Set construction only, not the has() check).
            </div>
          )}
        </div>


        {/* Student Cards */}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ ...css.panelTitle, marginBottom: 16, paddingLeft: 4 }}>
            👥 Students — sorted by GPA ↓{filterCourse ? ` · enrolled in "${filterCourse}"` : ""}
          </div>
          {displayStudents.length === 0 ? (
            <div style={{ textAlign: "center", color: "#334155", padding: "60px 0", fontSize: 15 }}>
              No students match this filter.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {displayStudents.map((s) => (
                <div key={s.id} style={css.studentCard(removeAnim === s.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>
                        ID #{s.id} · {s.enrolledCourses.size} course{s.enrolledCourses.size !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => removeStudent(s.id)}
                      style={{
                        background: "transparent", border: "1px solid #1e293b",
                        borderRadius: 8, color: "#475569", cursor: "pointer",
                        padding: "4px 10px", fontSize: 16, lineHeight: 1,
                        transition: "border-color .2s, color .2s",
                      }}
                      onMouseEnter={(e) => { e.target.style.borderColor = "#ef4444"; e.target.style.color = "#ef4444"; }}
                      onMouseLeave={(e) => { e.target.style.borderColor = "#1e293b"; e.target.style.color = "#475569"; }}
                    >×</button>
                  </div>


                  {/* GPA Bar */}
                  <GPABar gpa={s.gpa} />


                  {/* Courses — convert Set → Array before rendering */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {[...s.enrolledCourses].map((c) => (   // Set → Array spread
                      <span key={c} style={{
                        ...css.badge,
                        ...(c === filterCourse ? { background: "#818cf820", color: "#818cf8", border: "1px solid #818cf8" } : {}),
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Complexity Reference */}
        <div style={{ maxWidth: 900, margin: "40px auto 0", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, padding: "24px 28px" }}>
          <div style={css.panelTitle}>⏱ Time Complexity Reference</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
            <thead>
              <tr style={{ color: "#475569", borderBottom: "1px solid #1e293b" }}>
                {["Operation", "Complexity", "Reason"].map((h) => (
                  <th key={h} style={{ textAlign: "left", paddingBottom: 10, fontWeight: 600, letterSpacing: 1, paddingRight: 24 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Add student",          "O(1)",   "Map.set() + Set construction from array"],
                ["Remove student",       "O(1)",   "Map.delete() by id"],
                ["Sort by GPA",          "O(n log n)", "Array.sort()"],
                ["Filter by course",     "O(n)",   "filter() × O(1) Set.has() per student"],
                ["All unique courses",   "O(n·k)", "reduce over n students, k courses each"],
                ["Lookup student by id", "O(1)",   "Map.get(id)"],
              ].map(([op, comp, reason], i) => (
                <tr key={op} style={{ borderBottom: "1px solid #0f172a", background: i % 2 ? "#020817" : "transparent" }}>
                  <td style={{ padding: "10px 0", color: "#94a3b8", paddingRight: 24 }}>{op}</td>
                  <td style={{ color: "#4ade80", fontWeight: 700, paddingRight: 24 }}>{comp}</td>
                  <td style={{ color: "#475569", fontSize: 12 }}>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
