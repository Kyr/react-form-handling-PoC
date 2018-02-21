import Template from './Template';

export default function fromTemplate(layout) {
  return function LayoutTemplate(props) {
    return Template({ Layout: layout, ...props })
  }
}
