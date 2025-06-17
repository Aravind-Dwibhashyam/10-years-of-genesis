import {motion} from 'framer-motion';
import './TimelinePage.css';

function TimelinePage() {
    const milestones = [
  {
    
    "year": "2025",
    "title": 'A Decade of Innovation!',
    "description": 'Celebrating 10 years of decentralized progress and looking to the future.',
    "eips": [],
  },
  {
    
    "year": "2025",
    "title": "Prague-Electra (Pectra) Upgrade",
    "description": "Included improvements to Ethereum's staking architecture, enhancing scalability and flexibility.",
    "eips": ["EIP-7251", "EIP-7002"],
  },
  {
    
    "year": "2023",
    "title": "Shanghai Upgrade",
    "description": "Enabled users to withdraw their staked ETH and staking rewards, completing the transition to Proof-of-Stake.",
    "eips": [],
  },
  {
   
    "year": "2022",
    "title": "The Merge",
    "description": "Transitioned Ethereum from Proof-of-Work to Proof-of-Stake, significantly reducing energy consumption.",
    "eips": [],
  },
  {
    
    "year": "2021",
    "title": "London Upgrade",
    "description": "Implemented EIP-1559, changing the transaction fee mechanism and introducing a base fee that is burned.",
    "eips": ["EIP-1559", "EIP-3198", "EIP-3529", "EIP-3541", "EIP-3554"],
  },
  {
    
    "year": "2021",
    "title": "Berlin Upgrade",
    "description": "Introduced several EIPs to address gas price issues and introduce new transaction types.",
    "eips": ["EIP-2565", "EIP-2718", "EIP-2929", "EIP-2930"],
  },
  {
    
    "year": "2019",
    "title": "Istanbul Upgrade",
    "description": "Optimized gas costs and enabled Layer 2 scaling solutions using zk-SNARKs and STARKs.",
    "eips": [],
  },
  {
    "year": "2019",
    "title": "Constantinople & Petersburg",
    "description": "Introduced EIP-1234 to reduce block rewards and delay the difficulty bomb.",
    "eips": ["EIP-1234"],
  },
  {
    "year": "2017",
    "title": "Byzantium Upgrade",
    "description": "Part of the Metropolis phase, introducing privacy improvements and delaying the difficulty bomb.",
    "eips": ["EIP-100"],
  },
  {
    "year": "2016",
    "title": "Spurious Dragon",
    "description": "Improved network security and efficiency following spam attacks by adjusting gas costs and removing empty accounts.",
    "eips": [],
  },
  {
     "year": "2016",
    "title": "Tangerine Whistle",
    "description": "Addressed network congestion caused by a spam attack by adjusting gas costs.",
    "eips": [],
  },
  {
    "year": "2016",
    "title": "DAO Fork",
    "description": "A controversial hard fork to reverse the DAO hack, leading to the split between Ethereum (ETH) and Ethereum Classic (ETC).",
    "eips": ["EIP-779"],
  },
  {
    "year": "2016",
    "title": "Homestead Upgrade",
    "description": "The first planned hard fork, introducing protocol improvements and removing the 'canary' centralization point.",
    "eips": [],
  },
  {
   "year": "2015",
    "title": "Frontier Launch",
    "description": "The initial release of the Ethereum network, enabling the deployment of smart contracts and decentralized applications (dApps).",
    "eips": [],
  }
];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="timeline-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
          <motion.section className="timeline-section" variants={itemVariants}>
            <motion.h2 className="timeline-title">History of Ethereum</motion.h2>

            <div className="timeline-box">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="milestone-card"
                  custom={index}
                  initial="hidden"
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { 
                        type: 'spring', 
                        stiffness: 50, 
                        delay: 0.1 * index 
                      } 
                    },
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0px 10px 30px rgba(134, 168, 231, 0.25)",
                    borderColor: '#86a8e7'
                  }}
                >
                 
                  <div className="milestone-content">
                    <h3>{milestone.year} - {milestone.title}</h3>
                    <p>{milestone.description}</p>
                    {milestone.eips.length > 0 && (
                      <div className="eip-list">
                        <h4>Related EIPs:</h4>
                        <ul>
                          {milestone.eips.map((eip, eipIndex) => (
                            <li key={eipIndex}>{eip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
    </motion.div>
  )
}

export default TimelinePage;