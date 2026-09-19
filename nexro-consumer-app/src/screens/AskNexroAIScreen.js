import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radii, Shadows } from '../theme';
import ExplainableMatchCard from '../components/ExplainableMatchCard';
import { WORKERS } from '../data/mockData';

export default function AskNexroAIScreen({ onProceedToBooking, t }) {
  const [problemText, setProblemText] = useState('Water is dripping from under the kitchen sink and making a hissing sound.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState({
    category: 'Plumbing & Concealed Leak Repair',
    urgency: 'Priority (Same Day Dispatch)',
    estimatedRange: '₹249 - ₹399',
    diagnosisSummary: 'High probability of valve gasket degradation or flex hose washer failure.',
    worker: WORKERS[1],
  });
  const [hasPhoto, setHasPhoto] = useState(true);

  const samplePrompts = [
    { label: '💧 Water dripping under sink', text: 'Water is dripping from under the sink and making a hissing sound when the tap is turned on.' },
    { label: '⚡ MCB tripping repeatedly', text: 'Main electrical switch keeps tripping whenever the geyser and microwave run together.' },
    { label: '❄️ AC blowing warm air', text: 'Split AC is blowing room temperature air and outdoor unit is making a rattling noise.' },
  ];

  const handleDiagnose = () => {
    if (!problemText.trim()) return;

    setIsAnalyzing(true);
    setDiagnosisResult(null);

    // Simulate AI inference
    setTimeout(() => {
      setIsAnalyzing(false);
      const isElectrical = problemText.toLowerCase().includes('mcb') || 
                           problemText.toLowerCase().includes('electric') || 
                           problemText.toLowerCase().includes('switch') || 
                           problemText.toLowerCase().includes('wire');
      
      const matchedWorker = isElectrical ? WORKERS[0] : WORKERS[1]; // Rajesh Kumar or Ravi Varma
      
      setDiagnosisResult({
        category: isElectrical ? 'Electrical & Circuit Diagnostics' : 'Plumbing & Concealed Leak Repair',
        urgency: 'Priority (Same Day Dispatch)',
        estimatedRange: isElectrical ? '₹199 - ₹349' : '₹249 - ₹399',
        diagnosisSummary: isElectrical
          ? 'Probable overload on 16A circuit breaker or faulty heating coil causing ground trip.'
          : 'High probability of valve gasket degradation or flex hose washer failure.',
        worker: matchedWorker,
      });
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* AI Header */}
      <View style={styles.header}>
        <View style={styles.aiBadge}>
          <Ionicons name="sparkles" size={16} color="#FFFFFF" />
          <Text style={styles.aiBadgeText}>EXPLAINABLE COOPERATIVE AI</Text>
        </View>
        <Text style={styles.title}>{t.aiIntakeTitle || 'Ask Nexro AI'}</Text>
        <Text style={styles.subtitle}>
          {t.aiIntakeSubtitle || 'Describe your problem in plain words. Our model determines root cause, fair wage estimate & best worker match.'}
        </Text>
      </View>

      {/* Input Card */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder={t.aiPromptPlaceholder || 'e.g. "Water is dripping from under the sink and making a hissing sound..."'}
          placeholderTextColor={Colors.textMuted}
          value={problemText}
          onChangeText={setProblemText}
        />

        <View style={styles.inputActions}>
          <TouchableOpacity 
            style={[styles.actionChip, hasPhoto && styles.actionChipActive]}
            onPress={() => setHasPhoto(!hasPhoto)}
          >
            <Ionicons name={hasPhoto ? "checkmark-circle" : "camera-outline"} size={16} color={hasPhoto ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.actionChipText, hasPhoto && { color: Colors.primary }]}>
              {hasPhoto ? 'Photo Attached' : 'Attach Photo'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionChip}
            onPress={() => setProblemText('Water is leaking near the bathroom pipe joint and dripping into the ceiling.')}
          >
            <Ionicons name="mic" size={16} color={Colors.aiAccent} />
            <Text style={[styles.actionChipText, { color: Colors.aiAccent }]}>Voice Intake</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Sample Prompts */}
      <View style={styles.quickPromptsRow}>
        <Text style={styles.quickPromptLabel}>Quick diagnosis templates:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
          {samplePrompts.map((p, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.templateChip}
              onPress={() => {
                setProblemText(p.text);
              }}
            >
              <Text style={styles.templateText}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Diagnose CTA Button */}
      <TouchableOpacity
        style={[styles.diagnoseBtn, (!problemText.trim() || isAnalyzing) && styles.diagnoseBtnDisabled]}
        onPress={handleDiagnose}
        disabled={!problemText.trim() || isAnalyzing}
        activeOpacity={0.85}
      >
        {isAnalyzing ? (
          <>
            <ActivityIndicator color="#FFFFFF" size="small" />
            <Text style={styles.diagnoseBtnText}>AI Analyzing & Verifying Guild Pro...</Text>
          </>
        ) : (
          <>
            <Ionicons name="sparkles" size={18} color="#FFFFFF" />
            <Text style={styles.diagnoseBtnText}>Diagnose Issue & Match Pro</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Diagnosis Results Section */}
      {diagnosisResult && (
        <View style={styles.resultsSection}>
          <View style={styles.resultBanner}>
            <View style={styles.resultHeader}>
              <Ionicons name="analytics" size={18} color={Colors.primary} />
              <Text style={styles.resultTitle}>AI Diagnostic Assessment</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Identified Vertical:</Text>
              <Text style={styles.resultValue}>{diagnosisResult.category}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Urgency Classification:</Text>
              <Text style={[styles.resultValue, { color: Colors.danger }]}>{diagnosisResult.urgency}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Transparent Estimate:</Text>
              <Text style={[styles.resultValue, { color: Colors.primaryDark, fontWeight: '800' }]}>
                {diagnosisResult.estimatedRange}
              </Text>
            </View>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{diagnosisResult.diagnosisSummary}</Text>
            </View>
          </View>

          {/* Explainable Pro Match */}
          <ExplainableMatchCard
            worker={diagnosisResult.worker}
            triageReason={diagnosisResult.category}
          />

          {/* Direct Proceed Button */}
          <TouchableOpacity
            style={styles.bookProBtn}
            onPress={() => onProceedToBooking(diagnosisResult.worker, diagnosisResult.category)}
            activeOpacity={0.85}
          >
            <Text style={styles.bookProBtnText}>
              Book {diagnosisResult.worker.name} (₹{diagnosisResult.worker.hourlyRate})
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aiAccent,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
    marginBottom: 8,
  },
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  inputCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.card,
    marginBottom: 12,
  },
  textInput: {
    fontSize: Typography.fontSize.md,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.background,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  actionChipActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  actionChipText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  quickPromptsRow: {
    marginBottom: 16,
  },
  quickPromptLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '600',
  },
  templateChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  templateText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text,
    fontWeight: '500',
  },
  diagnoseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.aiAccent,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    ...Shadows.aiGlow,
  },
  diagnoseBtnDisabled: {
    backgroundColor: '#A5B4FC',
  },
  diagnoseBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  resultsSection: {
    marginTop: 20,
  },
  resultBanner: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  resultValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.text,
  },
  summaryBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radii.sm,
    padding: 10,
    marginTop: 10,
  },
  summaryText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryDark,
    lineHeight: 18,
  },
  bookProBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Radii.pill,
    gap: 8,
    marginTop: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  bookProBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
});
