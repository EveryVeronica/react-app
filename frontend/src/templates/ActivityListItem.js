import React, { useContext, useState, useEffect } from "react";
import {
  CuttingContext,
  ResponseContext,
  StylesContext,
  ToollistContext,
} from "../contexts";

function ActivityListItem() {
  const { cuttingDispatch } = useContext(CuttingContext);
  const { toollistState, toollistDispatch } = useContext(ToollistContext);

  const { ResponseState } = useContext(ResponseContext);
  const [items, setItems] = useState([]);
  const { styleAction, SetStyleAction } = useContext(StylesContext);

  useEffect(() => {
    if (ResponseState) {
      setItems([]);

      const lists = ResponseState.manage.lists;

      lists.forEach((manage, index) => {
        const _id = manage._id;

        const machine = manage.machine;

        const cutting = machine.setup.cutting;
        const cuttingJSON = JSON.parse(cutting);
        const cuttingMap = new Map(Object.entries(cuttingJSON));

        const toollist = machine.setup.tools;
        const toollistSON = JSON.parse(toollist);
        const toollistMap = new Map(Object.entries(toollistSON));

        setItems((prevItems) => [
          ...prevItems,
          <div
            key={`row_${index}`}
            id={_id}
            onClick={async (event) => {
              const tagId = event.target.id;

              await cuttingDispatch({
                type: "data",
                payload: cuttingMap,
              });

              await toollistDispatch({
                type: "data",
                payload: toollistMap,
              });

              SetStyleAction(true);
            }}
          >
            {machine.heading}
          </div>,
        ]);
      });
    }
  }, [ResponseState]);

  return <div>{items}</div>;
}

export default ActivityListItem;
