import { StyleSheet } from 'react-native';
import { AppTheme } from '../theme/ThemeContext';
import { SPACING, RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from './tokens';

export const createStyles = (theme: AppTheme) => {
  // ==================== Base Styles (DRY principle) ====================
  const baseCard = {
    backgroundColor: theme.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.small,
  };

  const baseButton = {
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return StyleSheet.create({
    // ==================== Layout ====================
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    // ==================== Header ====================
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.xxl,
    },

    greeting: {
      fontSize: FONT_SIZE.base,
      color: theme.secondary,
      marginBottom: SPACING.xs,
      fontWeight: FONT_WEIGHT.medium,
    },

    title: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.text,
    },

    subtitle: {
      fontSize: FONT_SIZE.base,
      color: theme.secondary,
      marginTop: SPACING.xs,
      fontWeight: FONT_WEIGHT.medium,
    },

    // ==================== Sections ====================
    section: {
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.xl,
    },

    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },

    sectionTitle: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.text,
    },

    seeAllText: {
      fontSize: FONT_SIZE.sm,
      color: theme.primary,
      fontWeight: FONT_WEIGHT.semibold,
    },

    // ==================== Cards ====================
    card: {
      ...baseCard,
      borderRadius: RADIUS.lg,
      marginHorizontal: SPACING.lg,
      marginTop: SPACING.lg,
      ...SHADOWS.medium,
    },

    cardTitle: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.semibold,
      color: theme.text,
      marginBottom: SPACING.md - 2, // 10
    },

    // ==================== Quick Actions ====================
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.md,
    },

    actionCard: {
      ...baseCard,
      flex: 1,
      minWidth: '47%',
    },

    actionIcon: {
      fontSize: FONT_SIZE.xxl,
      marginBottom: SPACING.sm,
      color: theme.primary,
    },

    actionTitle: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.semibold,
      color: theme.text,
    },

    // ==================== Crypto Cards ====================
    cryptoList: {
      gap: SPACING.md,
    },

    cryptoCard: {
      ...baseCard,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    cryptoInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
    },

    cryptoIcon: {
      width: 44,
      height: 44,
      borderRadius: RADIUS.xxl,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },

    cryptoSymbol: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.primary,
    },

    cryptoName: {
      fontSize: FONT_SIZE.base,
      fontWeight: FONT_WEIGHT.semibold,
      color: theme.text,
      marginBottom: SPACING.xs / 2,
    },

    cryptoSymbolText: {
      fontSize: FONT_SIZE.sm,
      color: theme.secondary,
      fontWeight: FONT_WEIGHT.medium,
    },

    cryptoPrice: {
      alignItems: 'flex-end',
    },

    cryptoPriceText: {
      fontSize: FONT_SIZE.base,
      fontWeight: FONT_WEIGHT.semibold,
      color: theme.text,
      marginBottom: SPACING.xs / 2,
    },

    cryptoChange: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },

    positiveChange: {
      color: theme.success,
    },

    negativeChange: {
      color: theme.danger,
    },

    // ==================== Buttons ====================
    button: {
      padding: SPACING.sm,
      borderRadius: RADIUS.sm,
      backgroundColor: theme.primary,
      marginBottom: SPACING.md,
    },

    buttonText: {
      color: theme.onPrimary,
      fontWeight: FONT_WEIGHT.semibold,
      fontSize: FONT_SIZE.md,
    },

    ctaButton: {
      ...baseButton,
      flexDirection: 'row',
      backgroundColor: theme.primary,
      marginHorizontal: SPACING.xl,
      padding: SPACING.lg + 2,
      gap: SPACING.sm,
      marginTop: SPACING.xxxxl,
      ...SHADOWS.medium,
    },

    ctaButtonText: {
      fontSize: FONT_SIZE.base,
      fontWeight: FONT_WEIGHT.semibold,
      color: theme.onPrimary,
    },

    ctaButtonIcon: {
      fontSize: FONT_SIZE.lg,
      color: theme.onPrimary,
    },

    // ==================== Period Buttons ====================
    periodButton: {
      paddingVertical: SPACING.sm - 2,
      paddingHorizontal: SPACING.sm + 6,
      borderRadius: RADIUS.md,
      backgroundColor: theme.card,
      marginRight: SPACING.sm,
    },

    periodButtonActive: {
      backgroundColor: theme.primary,
    },

    periodButtonText: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.medium,
      color: theme.text,
    },

    periodButtonTextActive: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.medium,
      color: theme.onPrimary,
    },

    // ==================== Chart ====================
    chartContainer: {
      ...baseCard,
      marginTop: SPACING.sm,
    },

    chartBars: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: SPACING.xs,
    },

    // ==================== Typography ====================
    text: {
      fontSize: FONT_SIZE.md,
      color: theme.text,
      lineHeight: 22,
    },

    textSecondary: {
      fontSize: FONT_SIZE.sm,
      color: theme.secondary,
    },

    linkText: {
      fontSize: FONT_SIZE.md,
      color: theme.primary,
      marginTop: SPACING.sm,
      fontWeight: FONT_WEIGHT.medium,
    },

    // ==================== Layout Utilities ====================
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: SPACING.sm - 2,
    },

    bottomSpacing: {
      height: SPACING.xxl,
    },
  });
};