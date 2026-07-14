import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import MainLayout from "../layouts/MainLayout";
import Transactions from "../../modules/transactions/pages/Transactions";
import GoldManagement from "../../modules/gold/pages/GoldManagement";
import SilverManagement from "../../modules/silver/pages/SilverManagement";
import Ledger from "../../modules/ledger/pages/Ledger";
import ComingSoon from "../../pages/ComingSoon";
import FinancePlanning from "../../modules/finance/pages/FinancePlanning";
import TeamManagement from "../../modules/team/pages/TeamManagement";

export default function AppRouter() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/">
          <Redirect to="/transactions" />
        </Route>
        
        <Route path="/transactions">
          <MainLayout>
            <Transactions />
          </MainLayout>
        </Route>

        <Route path="/ledger">
          <MainLayout>
            <Ledger />
          </MainLayout>
        </Route>
        <Route path="/finance">
          <MainLayout>
            <FinancePlanning />
          </MainLayout>
        </Route>
        <Route path="/team">
          <MainLayout>
            <TeamManagement />
          </MainLayout>
        </Route>
        <Route path="/gold">
          <MainLayout>
            <GoldManagement />
          </MainLayout>
        </Route>
        <Route path="/silver">
          <MainLayout>
            <SilverManagement />
          </MainLayout>
        </Route>
        <Route path="/karigar">
          <MainLayout>
            <ComingSoon title="Karigar" />
          </MainLayout>
        </Route>
        <Route path="/stock">
          <MainLayout>
            <ComingSoon title="Stock Management" />
          </MainLayout>
        </Route>
        <Route path="/sales">
          <MainLayout>
            <ComingSoon title="Sales" />
          </MainLayout>
        </Route>
        <Route path="/purchase">
          <MainLayout>
            <ComingSoon title="Purchase" />
          </MainLayout>
        </Route>
        <Route path="/diamond">
          <MainLayout>
            <ComingSoon title="Diamond Management" />
          </MainLayout>
        </Route>

        <Route>
          <MainLayout>
            <ComingSoon title="Page Not Found" />
          </MainLayout>
        </Route>
      </Switch>
    </WouterRouter>
  );
}
