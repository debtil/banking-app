import React from 'react'
import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from "@/components/RightSidebar";
const Home = () => {
    const loggedIn = {firstName: 'Matheus', lastName: 'Souza', email: 'matheus.debtilsouza@gmail.com'};

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox 
                        type="greeting"
                        title="Bem-vindo"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Acesse e gerencie sua aconta e transações com eficiência."
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>
            </div>
            <RightSidebar user={loggedIn} transactions={[]} banks={[{}, {}]}/>
        </section>
    )
}

export default Home;