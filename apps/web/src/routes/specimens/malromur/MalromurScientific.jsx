export default function SpecimenFour() {
  return (
    <div className="w-full min-h-screen relative bg-white">
      {/* SECTION 1: TITLE PAGE */}
      <section className="w-full min-h-screen flex items-center justify-center px-8 py-24 bg-[#F5F1E8]">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <h1 className="text-black text-[64px] font-normal font-['TG_Malromur'] leading-[72px] tracking-wide">
            TG MÁLRÓMUR
          </h1>

          <div className="w-32 h-[1px] bg-black mx-auto" />

          <p className="text-black text-xl font-normal font-['TG_Malromur'] leading-7 italic">
            Scientific Typography Specimen
          </p>

          <div className="w-32 h-[1px] bg-black mx-auto" />

          <div className="space-y-6 text-black text-base font-['TG_Malromur'] leading-6">
            <p>
              Demonstrating formal academic publication typography
            </p>
            <p>
              as typeset in 2024 <span className="italic">for</span> scientific research
            </p>
          </div>

          <div className="mt-20 space-y-4 text-black text-sm font-normal font-['TG_Malromur'] leading-5">
            <p>Type design</p>
            <p className="italic">by Kolkrabbi Foundry</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAPER */}
      <section className="w-full px-8 py-24">
        <div className="max-w-[800px] mx-auto">
          {/* Abstract */}
          <div className="text-center mb-16 pb-8 border-b-2 border-black">
            <h2 className="text-black text-[20px] font-medium font-['TG_Malromur'] leading-[28px] mb-6 uppercase tracking-wide">
              Abstract
            </h2>
            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              Though several serious objections to the null-hypothesis significance test method are raised, "its most basic error lies in mistaking the aim of a scientific investigation to be a decision, rather than a cognitive evaluation... It is further argued that the proper application of statistics to scientific inference is irrevocably committed to extensive consideration of inverse probabilities, and to further this end, certain suggestions are offered."
            </p>
          </div>

          {/* Paper Title and Author */}
          <div className="text-center mb-12">
            <h1 className="text-black text-[48px] font-medium font-['TG_Malromur'] leading-[56px] mb-6">
              The Fallacy of the Null‑Hypothesis Significance Test
            </h1>
            <p className="text-black text-[20px] font-normal font-['TG_Malromur'] leading-[28px] mb-2">
              William W. Rozeboom, St. Olaf College
            </p>
            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] italic">
              Psychological Bulletin, 1960, Vol. 57, № 5, pp. 416–428.
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-6 mb-12">
            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              The theory of probability and statistical inference is various things to various people. To the mathematician, it is an intricate formal calculus, to be explored and developed with little professional concern for any empirical significance that might attach to the terms and propositions involved. To the philosopher, it is an embarrassing mystery whose justification and conceptual clarification have remained stubbornly refractory to philosophical insight. (A famous philosophical epigram has it that induction [a special case of statistical inference] is the glory of science and the scandal of philosophy.) To the experimental scientist, however, statistical inference is a research instrument, a processing device by which unwieldy masses of raw data may be refined into a product more suitable for assimilation into the corpus of science, and in this lies both strength and weakness.
            </p>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              It is strength in that, as an ultimate <span className="italic">consumer</span> of statistical methods, the experimentalist is in position to demand that the techniques made available to him confirm to his actual needs. But it is also weakness in that, in his need for the tools constructed by a highly technical formal discipline, the experimentalist, who has specialized along other lines, seldom feels competent to extend criticisms or even comments; he is much more likely to make unquestioning application of procedures learned more or less by rote from persons assumed to be more knowledgeable of statistics than he.
            </p>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              There is, of course, nothing surprising or reprehensible about this — one need not understand the principles of a complicated tool in order to make effective use of it, and the research scientist can no more be expected to have sophistication in the theory of statistical inference than he can be held responsible for the principles of the computers, signal generators, timers, and other complex modern instruments to which he may have recourse during an experiment.
            </p>
          </div>

          {/* Case Study Section */}
          <div className="mb-12 pt-8 border-t border-black">
            <h2 className="text-black text-[32px] font-medium font-['TG_Malromur'] leading-[40px] text-center mb-8">
              A Case Study in Null‑Hypothesis Procedure
            </h2>
            <h3 className="text-black text-[20px] font-normal font-['TG_Malromur'] leading-[28px] italic text-center mb-8">
              or, A Quorum of Embarrassments
            </h3>

            <div className="space-y-6">
              <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
                Suppose that according to the theory of behavior, <span className="italic">T₀</span>, held by most right-minded, respectable behaviorists, the extent to which a certain behavioral manipulation <span className="italic">M</span> facilitates learning in a certain complex learning situation <span className="italic">C</span> should be null. That is, if <span className="italic">E</span> is an experimental design in which <span className="italic">M</span> is manipulated and its effects on learning in <span className="italic">C</span> are measured, then <span className="italic">T₀</span> predicts that the dependent variable will be influenced only by random variation.
              </p>

              <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
                Further, suppose that most laboratories with an interest in the phenomenon have carried out experiments investigating <span className="italic">M</span> and <span className="italic">C</span> without finding any significant effect. The evidence has thus been largely consistent with <span className="italic">T₀</span>, and the theory has acquired considerable prestige, at least to the extent of shaping the direction of research in the area — if <span className="italic">M</span> has no influence on learning in <span className="italic">C</span>, why waste time examining it?
              </p>

              <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
                But now along comes Investigator Jones who, for reasons known only to himself and perhaps involving some Oedipal competitiveness with professional tradition, decides to put <span className="italic">T₀</span> to another test in the most approved manner. He takes a large sample of subjects and divides them randomly into two groups — let us call them Group <span className="italic">E</span> and Group <span className="italic">C</span>. Group <span className="italic">E</span> receives manipulation <span className="italic">M</span> while Group <span className="italic">C</span> is a control that receives no treatment.
              </p>
            </div>
          </div>

          {/* Data Table */}
          <div className="mb-12 bg-[#F5F1E8] p-8 rounded">
            <h3 className="text-black text-[32px] font-medium font-['TG_Malromur'] leading-[40px] mb-6 text-center">
              Experimental Results
            </h3>

            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">Group</th>
                  <th className="text-center py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">N</th>
                  <th className="text-center py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">Mean</th>
                  <th className="text-center py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">SD</th>
                  <th className="text-center py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">t</th>
                  <th className="text-center py-3 px-4 text-black text-[16px] font-medium font-['TG_Malromur'] leading-[24px]">p</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/20">
                  <td className="py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">Experimental</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">150</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">47.3</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">12.8</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px] italic" rowSpan="2">2.34</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px] italic" rowSpan="2">&lt; 0.02</td>
                </tr>
                <tr className="border-b border-black/20">
                  <td className="py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px] italic">Control</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">150</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">43.1</td>
                  <td className="text-center py-3 px-4 text-black text-[16px] font-normal font-['TG_Malromur'] leading-[24px]">13.2</td>
                </tr>
              </tbody>
            </table>

            <p className="mt-4 text-black text-[14px] font-normal font-['TG_Malromur'] leading-[20px] italic">
              Note: Scores represent number of correct responses in 60 trials. All values rounded to one decimal place.
            </p>
          </div>

          {/* Discussion */}
          <div className="space-y-6 mb-12">
            <h2 className="text-black text-[32px] font-medium font-['TG_Malromur'] leading-[40px] mb-6">
              Discussion
            </h2>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              The results obtained were statistically significant at the .02 level, thereby rejecting the null hypothesis. Yet what has Jones actually learned from his experiment? He now knows that manipulation <span className="italic">M</span> has <span className="italic">some</span> effect on performance in situation <span className="italic">C</span>, but he does not know whether the effect is large or small, nor does he know whether the effect will replicate. The significance test has told him only that the effect is probably not exactly zero.
            </p>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              Moreover, had Jones obtained a non-significant result, it would have been equally uninformative. A non-significant result does not confirm the null hypothesis; it merely fails to disconfirm it. Yet the widespread practice of accepting the null hypothesis when the test statistic fails to reach significance has become one of the most serious sources of confusion in scientific literature.
            </p>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              The null-hypothesis significance test answers a question that no scientific investigator ever asks, and its proper application depends upon assumptions about reality that no sane person would accept. Yet we continue to teach it, use it, and publish papers based upon it, primarily through force of habit and professional inertia.
            </p>
          </div>

          {/* Conclusion */}
          <div className="pt-8 border-t-2 border-black">
            <h2 className="text-black text-[32px] font-medium font-['TG_Malromur'] leading-[40px] mb-6">
              Conclusion
            </h2>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify mb-6">
              The thesis advanced in this paper is that the traditional null-hypothesis significance test is based upon a fundamental misunderstanding of the nature of rational inference, and is seldom if ever appropriate to the aims of scientific research. While this view is not particularly original, the statistical folkways of a more primitive past continue to dominate the contemporary scene.
            </p>

            <p className="text-black text-[18px] font-normal font-['TG_Malromur'] leading-[28px] text-justify">
              It is time for a reexamination of our basic inferential procedures, with particular attention to the proper role of inverse probability and Bayesian methods in scientific investigation. Only through such a reexamination can we hope to develop statistical techniques that truly serve the goals of science, rather than merely perpetuating ritualistic practices inherited from an earlier era.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center pt-12 border-t border-black mt-12">
            <p className="text-black text-sm font-normal font-['TG_Malromur'] leading-5 italic">
              Psychological Bulletin · Vol. 57, № 5 · 1960
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
