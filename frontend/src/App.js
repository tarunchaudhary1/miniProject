import "./App.css";

import { Context } from "./Context";
import Content from "./Content";

export default function App() {
  return (
    <div className="home-page">
      <Context>
        <Content />
      </Context>
    </div>
  );
}
