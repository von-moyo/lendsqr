import { FilterIcon } from "assets";
import styles from "./styles.module.scss";
import { useClickOutside } from "helpers";
import { useState, useRef } from "react";
import * as yup from "yup";
import { CustomSelect, Input } from "components/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OptionType } from "types";
import { Button } from "components/button";

interface FilterDetails {
  username?: string;
  date?: string;
  phoneNumber?: string;
  organization: {
    label: string;
    value: string;
  };
  status: {
    label: string;
    value: string;
  };
  email: string;
}

const initFilterData: FilterDetails = {
  organization: { label: "", value: "" },
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: { label: "", value: "" },
};

const optionTypeSchema = yup.object({
  label: yup.string().required(),
  value: yup.string().required(),
});
const phoneRegExp = /^[0-9]{10}$/;

const filterSchema = yup
  .object({
    organization: optionTypeSchema,
    username: yup.string(),
    email: yup.string().email("Enter a valid email").required(),
    date: yup.string(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    status: optionTypeSchema,
  })
  .required();

export interface FilterProps {
  className?: string;
  submit: (data: FilterDetails) => void;
}

const Filter: React.FC<FilterProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<FilterDetails>({
    resolver: yupResolver(filterSchema),
    defaultValues: initFilterData,
  });
  const [show, setList] = useState(false);
  const [show2, setShow2] = useState(false);
  const sort: OptionType[] = [
    {
      label: "active",
      value: "active",
    },
    {
      label: "draft",
      value: "draft",
    },
  ];
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setList(false));

  const onSubmit: SubmitHandler<FilterDetails> = (data) => {
    submit(data);
    console.log(data);
  };

  const handleReset = () => {
    reset(initFilterData);
    submit(initFilterData);
  };

  console.log(show);

  return (
    <div ref={dropdownRef} className={`${styles.sort} ${""}`}>
      <div
        onClick={() => setList(!show)}
        role="button"
        className={styles.sortHd}
      >
        <FilterIcon />
      </div>

      {show && (
        <div  className={styles.sortList}>
          {show ? (
            <form className={styles.sortList__items}>
              <CustomSelect
                onChange={(val) => setValue("organization", val)}
                validatorMessage={
                  errors?.organization?.value?.message?.toString() ?? ""
                }
                name={"sector"}
                placeholder={"Select"}
                label={"Organization"}
                value={watch("organization")}
                options={sort}
                inputClass={styles.selectClass}
              />
              <Input
                label="Username"
                placeholder="User"
                type="username"
                required
                validatorMessage={errors.username?.message}
                name="username"
                register={register}
                value={watch("username")}
                className={styles.filterInput}
              />
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                required
                validatorMessage={errors.email?.message}
                name="email"
                register={register}
                value={watch("email")}
                className={styles.filterInput}
              />
              <Input
                label="Date"
                placeholder="Date"
                type="date"
                required
                validatorMessage={errors.date?.message}
                name="date"
                register={register}
                value={watch("date")}
                className={`${styles.filterInput} ${styles.dateInput}`}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                type="phoneNumber"
                required
                validatorMessage={errors.phoneNumber?.message}
                name="phoneNumber"
                register={register}
                value={watch("phoneNumber")}
                className={styles.filterInput}
              />
              <CustomSelect
                onChange={(val) => setValue("status", val)}
                validatorMessage={
                  errors?.status?.value?.message?.toString() ?? ""
                }
                name={"sector"}
                placeholder={"Select"}
                label={"Status"}
                value={watch("status")}
                options={sort}
                inputClass={styles.selectClass}
              />
              <div className={styles.buttons}>
                <Button
                  type="secondary"
                  onClick={handleReset}
                  className={`${styles.resetBtn} ${styles.btn}`}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  onClick={handleSubmit(onSubmit)}
                  className={`${styles.btn}`}
                >
                  Filter
                </Button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export { Filter };
