"use client"; // ต้องเพิ่มบรรทัดนี้
import { useSession } from "next-auth/react";
import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";

export default function TopMenu() {
    const { data: session } = useSession(); // ใช้ useSession() แทน

    console.log("Session data:", session); // ✅ ตรวจสอบค่าของ session
    return (
        <div className={styles.menucontainer}>
            <Image src={"/img/logo.jpg"} className={styles.logoimg} alt="logo" width={0} height={0} sizes="100vh" />
            <div className={styles.itemcontainer}>
                <span className={styles.itemLabel}>Menu Item</span>
                <TopMenuItem title="Booking" pageRef="/reservation" />
            </div>

            <Link href="/myreservation">
                <div className="flex items-center h-full px-2 text-black-600 text-sm">
                        MY BOOKING
                </div>
            </Link>

            {session ? (
                <Link href="/api/auth/signout">
                    <div className="flex items-center absolute left-5 h-full px-2 text-black-600 text-sm">
                        SIGN-OUT
                    </div>
                </Link>
            ) : (
                <Link href="/api/auth/signin">
                    <div className="flex items-center absolute left-5 h-full px-2 text-black-600 text-sm">
                        SIGN-IN
                    </div>
                </Link>
            )}

                <Link href="/register">
                    <div className="flex items-center absolute left-24 h-full px-2 text-black-600 text-sm">
                        REGISTER
                    </div>
                </Link>
        </div>
    );
}
