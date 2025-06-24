"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const { data: session } = authClient.useSession();

	const onSubmit = () => {
		authClient.signUp.email(
			{
				email,
				password,
				name,
			},
			{
				onSuccess: (ctx) => {
					window.alert("Success");
				},
				onError: (ctx) => {
					window.alert("Something went wrong");
				},
			}
		);
	};

	const onLogin = () => {
		authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: (ctx) => {
					window.alert("Success");
				},
				onError: (ctx) => {
					window.alert("Something went wrong");
				},
			}
		);
	};

	if (session) {
		return (
			<div>
				<h1>Hello {session.user.name}</h1>
				<Button onClick={() => authClient.signOut()}>Sign Out</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-10">
			<div>
				<h1>Name</h1>
				<Input
					name="name"
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
				/>
				<h1>Email</h1>
				<Input
					name="email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<h1>Password</h1>
				<Input
					name="password"
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button onClick={onSubmit}>Create User</Button>
			</div>
			<div>
				<h1>Email</h1>
				<Input
					name="email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<h1>Password</h1>
				<Input
					name="password"
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button onClick={onLogin}>Login</Button>
			</div>
		</div>
	);
}
