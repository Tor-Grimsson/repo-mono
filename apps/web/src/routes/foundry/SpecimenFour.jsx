export default function SpecimenFour() {
  return (
    <div className="w-[1680px] h-[5800px] relative bg-white mx-auto pb-20">
      {/* Main Title Section */}
      <div className="w-[1158.01px] left-[224px] top-[28px] absolute inline-flex flex-col justify-start items-start gap-10">
        <div className="w-[1048.55px] h-72 justify-center">
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]">Yes, you could typeset a<br/>scientific paper in the<br/></span>
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]">Playfair 2·0</span>
          <span className="text-black text-8xl font-bold font-['Playfair'] leading-[93.33px]"> typeface family</span>
        </div>
        <div className="self-stretch h-28 justify-center text-black text-4xl font-normal font-['Playfair'] leading-9">
          You are looking at one. This document demonstrates how Playfair 2·0 can be<br/>
          employed to typeset a formal scientific paper. In this demonstration a paper first<br/>
          published 1960 in the American journal 'Psychological Bulletin'.
        </div>
      </div>

      {/* Abstract */}
      <div className="w-[577.11px] h-6 left-[541.33px] top-[580.77px] absolute text-center justify-center text-black text-xl font-normal font-['Playfair'] leading-6">Abstract</div>
      <div className="w-[577.11px] h-48 left-[541.33px] top-[620.43px] absolute justify-center text-black text-xl font-normal font-['Playfair'] leading-6">
        Though several serious objections to the null-hypothesis<br/>
        significance test method are raised, "its most basic error lies in<br/>
        mistaking the aim of a scientific investigation to be a decision,<br/>
        rather than a cognitive evaluation… . It is further argued that<br/>
        the proper application of statistics to scientific inference is<br/>
        irrevocably committed to extensive consideration of inverse<br/>
        probabilities, and to further this end, certain suggestions are<br/>
        offered."
      </div>

      {/* Paper Title and Author */}
      <div className="w-[947.07px] h-10 left-[366.66px] top-[893.63px] absolute text-center justify-center text-black text-4xl font-normal font-['Playfair'] leading-7 tracking-wide">
        The Fallacy of the Null⁠-⁠Hypothesis Significance Test
      </div>
      <div className="w-80 h-6 left-[675.60px] top-[937.52px] absolute text-center justify-center text-black text-xl font-normal font-['Playfair'] leading-6">
        William W. Rozeboom, St. Olaf College
      </div>
      <div className="w-[520.96px] h-6 left-[598.41px] top-[962.15px] absolute text-center justify-center text-black text-xl font-normal font-['Playfair'] leading-6">
        Psychological Bulletin, 1960, Vol. 57, №⁠ ⁠5, pp. 416–428.
      </div>

      {/* Body Text - First Paragraph */}
      <div className="w-[1232.35px] left-[224px] top-[1001.71px] absolute space-y-[24.63px]">
        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          The theory of probability and statistical inference is various things to various people. To the mathematician, it is an intricate formal
          calculus, to be explored and developed with little professional concern for any empirical significance that might attach to the terms
          and propositions involved. To the philosopher, it is an embarrassing mystery whose justification and conceptual clarification have
          remained stubbornly refractory to philosophical insight. (A famous philosophical epigram has it that induction [⁠ ⁠a special case of
          statistical inference⁠ ⁠] is the glory of science and the scandal of philosophy.) To the experimental scientist, however, statistical
          inference is a research instrument, a processing device by which unwieldy masses of raw data may be refined into a product more
          suitable for assimilation into the corpus of science, and in this lies both strength and weakness. It is strength in that, as an ultimate
          <span className="italic">consumer</span> of statistical methods, the experimentalist is in position to demand that the techniques made available to him confirm to his
          actual needs. But it is also weakness in that, in his need for the tools constructed by a highly technical formal discipline, the
          experimentalist, who has specialized along other lines, seldom feels competent to extend criticisms or even comments; he is much
          more likely to make unquestioning application of procedures learned more or less by rote from persons assumed to be more
          knowledgeable of statistics than he. There is, of course, nothing surprising or reprehensible about this — one need not understand the
          principles of a complicated tool in order to make effective use of it, and the research scientist can no more be expected to have
          sophistication in the theory of statistical inference than he can be held responsible for the principles of the computers, signal
          generators, timers, and other complex modern instruments to which he may have recourse during an experiment. Nonetheless, this
          leaves him particularly vulnerable to misinterpretation of his aims by those who build his instruments, not to mention the ever
          present dangers of selecting an inappropriate or outmoded tool for the job at hand, misusing the proper tool, or improvising a tool of
          unknown adequacy to meet a problem not conforming to the simple theoretical situations in terms of which existent instruments have
          been analyzed. Further, since behaviors once exercised tend to crystallize into habits and eventually traditions, it should come as no
          surprise to find that the tribal rituals for data-processing passed along in graduate courses in experimental method should contain
          elements justified more by custom than by reason.
        </p>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[37.33px]">
          In this paper, I wish to examine a dogma of inferential procedure which, for psychologists at least, has attained the status of a
          religious conviction. The dogma to be scrutinized is the "null-hypothesis significance test" orthodoxy that passing statistical
          judgment on a scientific hypothesis by means of experimental observation is a decision procedure wherein one rejects or accepts a null
          hypothesis according to whether or not the value of a sample statistic yielded by an experiment falls within a certain predetermined
          "rejection region" of its possible values. The thesis to be advanced is that despite the awesome pre-eminence this method has attained
          in our experimental journals and textbooks of applied statistics, it is based upon a fundamental misunderstanding of the nature of
          rational inference, and is seldom if ever appropriate to the aims of scientific research. This is not a particularly original view —
          traditional null-hypothesis procedure has already been superceded in modern statistical theory by a variety of more satisfactory
          inferential techniques. But the perceptual defenses of psychologists are particularly efficient when dealing with matters of
          methodology, and so the statistical folkways of a more primitive past continue to dominate the local scene.
        </p>
      </div>

      {/* Case Study Section */}
      <div className="w-[1232.35px] left-[224px] top-[1789.80px] absolute space-y-[24.63px]">
        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          To examine the method in question in greater detail, and expose some of the discomfitures to which it gives rise, let us begin with a
          hypothetical case study:
        </p>

        <h2 className="w-[770.76px] mx-auto text-center text-black text-4xl font-normal font-['Playfair'] leading-7 tracking-wide mt-[49.12px]">
          A Case Study in Null⁠-⁠Hypothesis Procedure;<br/>or, A Quorum of Embarrassments
        </h2>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 mt-[70.76px]">
          <span>Suppose that according to the theory of behavior, </span>
          <span className="italic">T</span>
          <span>₀, held by most right-minded, respectable behaviorists, the extent to which a certain behavioral manipulation </span>
          <span className="italic">M</span>
          <span> facilitates learning in a certain complex learning situation </span>
          <span className="italic">C</span>
          <span> should be null. That is, if </span>
          <span>"f"</span>
          <span> designates the degree to which manipulation </span>
          <span className="italic">M</span>
          <span> facilitates the acquisition of habit </span>
          <span className="italic">H</span>
          <span> under circumstances </span>
          <span className="italic">C,</span>
          <span> it follows from the orthodox theory </span>
          <span className="italic">T</span>
          <span>₀ that </span>
          <span className="italic">f⁠ </span>
          <span> ⁠=⁠ ⁠⁠ ⁠0. Also suppose, however, that a few radicals have persistently advocated an alternative theory </span>
          <span className="italic">T</span>
          <span>₁ which entails, among other things, that the facilitation of </span>
          <span className="italic">H</span>
          <span> by </span>
          <span className="italic">M</span>
          <span> in circumstances </span>
          <span className="italic">C</span>
          <span> should be appreciably greater than zero, the precise extent being dependent upon the values of certain parameters in </span>
          <span className="italic">C.</span>
          <span> Finally, suppose that Igor Hopewell, graduate student in psychology, has staked his dissertation hopes on an experimental test of </span>
          <span className="italic">T</span>
          <span>₀ against </span>
          <span className="italic">T</span>
          <span>₁ on the basis of their differential predictions about the value of </span>
          <span className="italic">f.</span>
        </p>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[37.33px]">
          <span>Now, if Hopewell is to carry out his assessment of the comparative merits of </span>
          <span className="italic">T</span>
          <span>₀ and </span>
          <span className="italic">T</span>
          <span>₁ in this way, there is nothing for him to do but submit a number of </span>
          <span className="italic">S</span>
          <span>s to manipulation </span>
          <span className="italic">M</span>
          <span> under circumstances </span>
          <span className="italic">C</span>
          <span> and compare their efficiency at acquiring habit </span>
          <span className="italic">H</span>
          <span> with that of comparable </span>
          <span className="italic">S</span>
          <span>s who, under circumstances </span>
          <span className="italic">C</span>
          <span>, have </span>
          <span className="italic">not</span>
          <span> been exposed to manipulation </span>
          <span className="italic">M</span>
          <span>. The difference, </span>
          <span className="italic">Δ,</span>
          <span> between experimental and control </span>
          <span className="italic">S</span>
          <span>s in average learning efficiency may then be taken as an operational measure of the degree, </span>
          <span className="italic">f,</span>
          <span> to which </span>
          <span className="italic">M</span>
          <span> influences acquisition of </span>
          <span className="italic">H</span>
          <span> in circumstances </span>
          <span className="italic">C</span>
          <span>. Unfortunately, however, as any experienced researcher knows to his sorrow, the interpretation of such an observed statistic is not quite so simple as that.</span>
        </p>
      </div>

      {/* Decisions vs. Degrees of Belief Section */}
      <div className="w-[1232.35px] left-[224px] top-[4196.10px] absolute space-y-[24.63px]">
        <h2 className="w-[536.55px] mx-auto text-center text-black text-4xl font-normal font-['Playfair'] leading-7 tracking-wide">
          Decisions vs. Degrees of Belief
        </h2>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 mt-[43.89px]">
          By now, is should be obvious that something is radically amiss with the traditional NHD assessment of an experiment's theoretical
          import. Actually, one does not have to look far in order to find the trouble — it is simply a basic misconception about the purpose of a
          scientific experiment. The null-hypothesis significance test treats acceptance or rejection of a hypothesis as though these were
          <span className="italic"> decisions</span> one makes on the basis of the experimental data — i.⁠ ⁠e., that we elect to adopt one belief, rather than another, as a result of an
          experiment. But this is a complete misrepresentation of scientific inquiry.
        </p>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[37.33px]">
          Now, the notion of "degree of belief appropriate to the data at hand" has an unpleasantly vague, subjective feel about it which
          makes it unpalatable for inclusion in a formalized theory of inference. Fortunately, a little reflection about this phrase reveals it to be
          intimately connected with another concept relating conclusion to evidence which, though likewise in serious need of conceptual
          clarification, has the virtues both of intellectual respectability and statistical familiarity. I refer, of course, to the <span className="italic">likelihood,</span> or
          <span className="italic"> probability,</span> conferred upon a hypothesis by available evidence. Why should not Smith <span className="italic">feel</span> certain, in view of the data available, that
          War Biscuit will win the fifth at Belmont? Because it <span className="italic">is</span> not certain that War Biscuit will win. More generally, what determines how
          strongly we should accept or reject a proposition is the probability given to this hypothesis by the information at hand. For while our
          belief in a hypothesis may vary in degree of intensity or firmness, the hypothesis itself is, in a sense, all or none.
        </p>
      </div>

      {/* Summary and Conclusion */}
      <div className="w-[1232.35px] left-[224px] top-[5000px] absolute space-y-[24.63px]">
        <h2 className="text-black text-xl font-bold font-['Playfair'] leading-6">Summary</h2>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          The traditional null-hypothesis significance-test method, more appropriately called "null-hypothesis decision [⁠ ⁠NHD⁠ ⁠] procedure," of
          statistical analysis is here vigorously excoriated for its inappropriateness as a method of <span className="italic">inference</span>. While a number of serious
          objections to the method are raised, its most basic error lies in mistaking the aim of a scientific investigation to be a decision, rather
          than a <span className="italic">cognitive</span> evaluation of propositions. It is further argued that the proper application of statistics to scientific inference is
          irrevocably committed to extensive consideration of inverse probabilities, and to further this end, certain suggestions are offered,
          both for the development of statistical theory and for more illuminating application of statistical analysis to empirical data.
        </p>

        <p className="text-center text-black text-xl font-normal font-['Playfair'] leading-6 mt-[49.25px]">
          ( Received June 30, 1959 )
        </p>

        <h2 className="text-black text-xl font-bold font-['Playfair'] leading-6 mt-[51.94px]">Footnotes</h2>

        <div className="space-y-[18.67px]">
          <p className="text-black text-base font-normal font-['Playfair'] leading-5">
            <span className="inline-block w-2"> </span>
            <span className="italic">s</span> is here the estimate of the standard error of the difference in means, not the estimate of the individual SD.
          </p>

          <p className="text-black text-base font-normal font-['Playfair'] leading-5">
            <span className="inline-block w-2"> </span>
            When the numbers of alternative hypotheses and possible experimental outcomes are transfinite, Pr⁠ ⁠(Δ, H)⁠ ⁠=⁠ ⁠Pr⁠ ⁠(H, Δ)⁠ ⁠=⁠ ⁠Pr⁠ ⁠(H)⁠ ⁠=⁠ ⁠0 in most cases. If so, the probability
            ratios in Formula 1 are replaced with the corresponding probabilistic-density ratios. It should be mentioned that this formula rather idealistically presupposes
            there to be no doubt about the correctness of the background statistical assumptions.
          </p>
        </div>

        <h2 className="text-black text-xl font-bold font-['Playfair'] leading-6 mt-[51.94px]">Reference</h2>
        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          Braithwaite, R. B. <span className="italic">Scientific explanation.</span> Cambridge, England: Cambridge Univer. Press, 1953.
        </p>

        <h2 className="text-black text-xl font-bold font-['Playfair'] leading-6 mt-[51.94px]">Citing this document</h2>
        <p className="text-black text-xl font-normal font-['Playfair'] leading-6">
          Rozeboom, W. W. (1960). <span className="italic">The fallacy of the null-hypothesis significance test.</span> Psychological Bulletin, 57(5), 416–428.
        </p>

        <p className="text-black text-xl font-normal font-['Playfair'] leading-6 pl-[56px]">
          https://doi.org/10.1037/h0042040
        </p>
      </div>
    </div>
  )
}
