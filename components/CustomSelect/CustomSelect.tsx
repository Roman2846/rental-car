"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}

export default function CustomSelect({
  value,
  onChange,
  placeholder,
  options,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={styles.trigger}
          aria-label={placeholder}
          aria-expanded={open}
        >
          <span>{value || placeholder}</span>

          <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`}>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.content}
          side="bottom"
          sideOffset={4}
          align="start"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className={styles.scrollArea}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.item} ${
                  value === option ? styles.selected : ""
                }`}
                aria-pressed={value === option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
