export default function TestPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <select
        onChange={(e) => {
          setSelectedIndex(e.target.value);
          seTabCreation(
            creations.filter((f) => f.filter?.name === e.target.value)
          );
        }}
      >
        <option value="all">All</option>
        {/* {arr?.map((tab, index) => {
          return (
            <option value={tab.name} key={index}>
              {tab.name}
            </option>
          );
        })} */}
      </select>
    </div>
  );
}
