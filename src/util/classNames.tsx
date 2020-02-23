type classNames = ({ [key: string]: boolean } | string)[];

const classNames = (...classNames: classNames) =>
  classNames
    .map(className => {
      if (typeof className === 'object') {
        return Object.keys(className)
          .filter(a => className[a])
          .join(' ');
      }
      return className;
    })
    .join(' ');

export default classNames;
