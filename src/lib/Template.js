import React from "react";
import PropTypes from "prop-types";

const defaultSlotName = "[[default slot]]";

Template.propTypes = {
  Layout: PropTypes.node.isRequired,
};

export default function Template(props) {
  const {
              Layout,
    children,
    ...rest
          } = props;

  return Layout({ slots: childrenToSlots(children), ...rest });
}

function childrenToSlots(childrens) {
  const slotsArray = React.Children.map(childrens, children => {
    if (!children.props.hasOwnProperty("slot")) return;

    const isString = typeof children.props.slot === "string";
    const slotName = isString && children.props.slot || defaultSlotName;

    return {
      slot: slotName,
      content: React.cloneElement(children, { slot: void 0 }),
    };
  });

  return slotsArray.reduce((acc, { slot, content }) => {
    return {
      ...acc,
      [slot]: content,
    };
  }, {});
}
