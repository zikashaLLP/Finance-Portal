import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import MainLayout from "../layouts/MainLayout";
import Transactions from "../../modules/transactions/pages/Transactions";
import GoldManagement from "../../modules/gold/pages/GoldManagement";
import SilverManagement from "../../modules/silver/pages/SilverManagement";
import KarigarManagement from "../../modules/karigar/pages/KarigarManagement";
import StockManagement from "../../modules/stock/pages/StockManagement";
import Dashboard from "../../modules/dashboard/pages/Dashboard";
import Reports from "../../modules/reports/pages/Reports";
import SalesManagement from "../../modules/sales/pages/SalesManagement";
import PurchaseManagement from "../../modules/purchase/pages/PurchaseManagement";
import DiamondQualityTracking from "../../modules/diamond/pages/DiamondQualityTracking";
import ComingSoon from "../../pages/ComingSoon";
import SettingsPage from "../../modules/settings/pages/SettingsPage";
import Accounts from "../../modules/accounts/pages/Accounts";

export default function AppRouter() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>

        <Route path="/dashboard">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>

        <Route path="/transactions">
          <MainLayout>
            <Transactions />
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

        <Route path="/diamond">
          <MainLayout>
            <DiamondQualityTracking />
          </MainLayout>
        </Route>

        <Route path="/stock">
          <MainLayout>
            <StockManagement />
          </MainLayout>
        </Route>

        <Route path="/purchase">
          <MainLayout>
            <PurchaseManagement />
          </MainLayout>
        </Route>

        <Route path="/sales">
          <MainLayout>
            <SalesManagement />
          </MainLayout>
        </Route>

        <Route path="/karigar">
          <MainLayout>
            <KarigarManagement />
          </MainLayout>
        </Route>

        <Route path="/reports">
          <MainLayout>
            <Reports />
          </MainLayout>
        </Route>

        <Route path="/accounts">
          <MainLayout>
            <Accounts />
          </MainLayout>
        </Route>

        <Route path="/settings">
          <MainLayout>
            <SettingsPage />
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
