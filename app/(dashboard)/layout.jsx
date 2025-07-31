
"use client";
import Header from "./_components/Header";
import Welcomeblock from "./_components/Welcomeblock";
export default function Dashboardlayout({ children }) {
    return <>
    <Header/>
<Welcomeblock/>
    {children}
    </>;
}