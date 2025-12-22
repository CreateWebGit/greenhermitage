import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const EmailFooter = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h3 className={styles.header}>HERMITAGE</h3>
				<div className=" text-white ea-grid">
					<div className="ea-col-4 ea-col-xs-12">
						<h3 className="font-[20px]">
							Hermitage Vegetariska Restaurang
						</h3>
						<div className="text-[#8A8B8A] font-[16px] ">
							St: Nygatan 11, Gamla Stan
						</div>
						<div className="text-[#8A8B8A] font-[16px] ">
							111 27 Stockholm
						</div>
					</div>
					<div className="ea-col-4 ea-col-xs-12 w-[200px]">
						<h3>Öppettider</h3>
						<div className="flex justify-between gap-4 text-[#8A8B8A]">
							<div>Vardagar</div>
							<div>11: 00 - 20:00</div>
						</div>
						<div className="flex justify-between gap-4 text-[#8A8B8A]">
							<div>Helger</div>
							<div>12: 00 - 20:00</div>
						</div>
					</div>
					<div className="ea-col-4 ea-col-xs-12 flex flex-col justify-center">
						<h3>Green Herimatge</h3>
						<p className="text-[#8A8B8A]">
							På Hermitage, tror vi på att ge näring till både
							kropp och själ. Vår meny är omsorgsfullt gjord med
							färska, säsongsbetonade råvaror från lokala gårdar.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmailFooter;
