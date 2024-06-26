import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FilterProps } from "components/filter";

// Table header item
interface TableHeaderItemProps {
  title: string;
  Icon: React.FunctionComponent<FilterProps>;
}

// Table header props
interface TableHeaderProps {
  tableHeaderTitles: TableHeaderItemProps[];
  tableHeadItemClassName?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: string;
  statusClass?: string;
}

/**
 * This is a representation of the table header
 * ---------------------------------------------------
 * @param tableHeaderTitles - @interface TableHeaderProps
 *
 */

const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeaderTitles,
  tableHeadItemClassName = "",
  tableHeaderClassName = "",
  tableRowClassName = "",
  statusClass = "",
}) => {
  const [show, setShow] = useState(false);
  return (
    <section className={`${styles.tableHeader} ${tableHeaderClassName}`}>
      {tableHeaderTitles.map((header, idx) => {
        const Icon = header.Icon;
        return (
          <div className={styles.tableHeaderStyle} key={idx}>
            <span
              className={` ${tableHeadItemClassName}`}
              key={`${header}${idx + 1}`}
            >
              {header.title}
            </span>
            <Icon
              className={`${styles.filterIcon} ${
                (header.title === "STATUS") && styles.statuss
              }`}
              // show={show}
              submit={() => {}}
              // close={()=>{}}
            />
          </div>
        );
      })}
    </section>
  );
};

export { TableHeader };
export type { TableHeaderItemProps, TableHeaderProps };
