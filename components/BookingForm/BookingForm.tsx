"use client";

import { useState, type FormEvent } from "react";
import styles from "./BookingForm.module.css";
import Image from "next/image";

interface BookingFormProps {
  carId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  comment?: string;
}

export default function BookingForm({ carId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!comment.trim()) {
      newErrors.comment = "Comment is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log("Booking form data:", {
      carId,
      name: name.trim(),
      email: email.trim(),
      comment: comment.trim(),
    });

    alert("Your booking request has been submitted!");

    setName("");
    setEmail("");
    setComment("");
    setErrors({});
  }

  return (
    <section className={styles.bookingForm}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            {errors.name && <span className={styles.floatingLabel}>Name*</span>}
            <input
              className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
              type="text"
              placeholder={errors.name ? "" : "Name*"}
              aria-label="Name"
              aria-invalid={Boolean(errors.name)}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
            />
            {errors.name && (
              <Image
                src="/icons/error.svg"
                alt=""
                width={24}
                height={24}
                className={styles.errorIcon}
              />
            )}
          </div>
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            {errors.email && (
              <span className={styles.floatingLabel}>Email*</span>
            )}
            <input
              className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
              type="email"
              placeholder={errors.email ? "" : "Email*"}
              aria-label="Email"
              aria-invalid={Boolean(errors.email)}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />
            {errors.email && (
              <Image
                src="/icons/error.svg"
                alt=""
                width={24}
                height={24}
                className={styles.errorIcon}
              />
            )}
          </div>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            <textarea
              className={`${styles.textarea} ${errors.comment ? styles.invalid : ""}`}
              placeholder="Comment"
              aria-label="Comment"
              aria-invalid={Boolean(errors.comment)}
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
                setErrors((prev) => ({ ...prev, comment: undefined }));
              }}
            />
            {errors.comment && (
              <Image
                src="/icons/error.svg"
                alt=""
                width={24}
                height={24}
                className={styles.errorIcon}
              />
            )}
          </div>
          {errors.comment && (
            <span className={styles.error}>{errors.comment}</span>
          )}
        </div>

        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
