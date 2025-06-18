import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '@/store/rootReducer.ts';
import {getSectorsChartPie, getPortfolioChartPie} from '@/utils';

export const selectPortfolio = (state: RootState) => state.user.portfolio;
export const selectFormattedPortfolio = (state: RootState) => state.user.formattedPortfolio;
export const selectAssetsWorth = (state: RootState) => state.user.assetsWorth;
export const selectBalance = (state: RootState) => state.user.balance;
export const selectOperations = (state: RootState) => state.user.operations;

export const selectPortfolioChartPie = createSelector(
    [selectPortfolio, selectAssetsWorth],
    (portfolio, assetsWorth) => getPortfolioChartPie(portfolio, assetsWorth),
);

export const selectSectors = createSelector(
    [selectPortfolio, selectAssetsWorth],
    (portfolio, assetsWorth) => getSectorsChartPie(portfolio, assetsWorth),
);