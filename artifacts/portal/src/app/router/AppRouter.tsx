import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import MainLayout from "../layouts/MainLayout";
import Transactions from "../../modules/transactions/pages/Transactions";
import GoldManagement from "../../modules/gold/pages/GoldManagement";
import SilverManagement from "../../modules/silver/pages/SilverManagement";
import Ledger from "../../modules/ledger/pages/Ledger";
import ComingSoon from "../../pages/ComingSoon";
import FinancePlanning from "../../modules/finance/pages/FinancePlanning";
import TeamManagement from "../../modules/team/pages/TeamManagement";
import KarigarManagement from "../../modules/karigar/pages/KarigarManagement";
import KarigarReports from "../../modules/karigar/pages/KarigarReports";
import BulkManagement from "../../modules/karigar/pages/BulkManagement";
import StockManagement from "../../modules/stock/pages/StockManagement";
import StockTallyReport from "../../modules/stock/pages/StockTallyReport";
import StockSummary from "../../modules/stock/pages/StockSummary";
import MaterialReport from "../../modules/stock/pages/MaterialReport";
import Dashboard from "../../modules/dashboard/pages/Dashboard";
import Reports from "../../modules/reports/pages/Reports";
import Approvals from "../../modules/approvals/pages/Approvals";
import HarvestManagement from "../../modules/harvest/pages/HarvestManagement";
import GroupManagement from "../../modules/harvest/pages/GroupManagement";
import GroundStaff from "../../modules/ground-staff/pages/GroundStaff";

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
        <Route path="/ground-staff">
          <MainLayout>
            <GroundStaff />
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
        <Route path="/karigar/reports">
          <MainLayout>
            <KarigarReports />
          </MainLayout>
        </Route>
        <Route path="/karigar/bulk">
          <MainLayout>
            <BulkManagement />
          </MainLayout>
        </Route>
        <Route path="/karigar">
          <MainLayout>
            <KarigarManagement />
          </MainLayout>
        </Route>
        <Route path="/stock/tally">
          <MainLayout>
            <StockTallyReport />
          </MainLayout>
        </Route>
        <Route path="/stock/summary">
          <MainLayout>
            <StockSummary />
          </MainLayout>
        </Route>
        <Route path="/stock/material">
          <MainLayout>
            <MaterialReport />
          </MainLayout>
        </Route>
        <Route path="/stock">
          <MainLayout>
            <StockManagement />
          </MainLayout>
        </Route>
        <Route path="/harvest/groups">
          <MainLayout>
            <GroupManagement />
          </MainLayout>
        </Route>
        <Route path="/harvest">
          <MainLayout>
            <HarvestManagement />
          </MainLayout>
        </Route>
        <Route path="/approvals">
          <MainLayout>
            <Approvals />
          </MainLayout>
        </Route>
        <Route path="/reports">
          <MainLayout>
            <Reports />
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
