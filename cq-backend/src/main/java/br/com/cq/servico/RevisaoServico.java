package br.com.cq.servico;

import java.lang.reflect.Type;
import java.util.List;

import org.joda.time.DateTime;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import br.com.cq.dominio.FiltroRevisao;
import br.com.cq.dominio.Questao;
import br.com.cq.dominio.Revisao;
import br.com.cq.dominio.dto.RevisaoDTO;
import br.com.cq.repositorio.QuestaoRepositorio;
import br.com.cq.repositorio.RevisaoRepositorio;

@Service
public class RevisaoServico implements IRevisaoServico {
	
	@Autowired
	private RevisaoRepositorio revisaoRepositorio;
	
	@Autowired
	private QuestaoRepositorio questaoRepositorio;
	
	private ModelMapper modelMapper = new ModelMapper();

	@Override
	public void criar(FiltroRevisao filtro) {
		Revisao.RevisaoBuilder revisao = Revisao.builder();
		List<Questao> questoes = null;
		if (!StringUtils.isEmpty(filtro.getIdDisciplina())) {
			questoes = questaoRepositorio.findByDisciplinaId(filtro.getIdDisciplina());
		}
		if (!StringUtils.isEmpty(filtro.getIdAssunto())) {
			questoes = questaoRepositorio.findByAssuntoId(filtro.getIdAssunto());
		}
		revisaoRepositorio.save(revisao
				.questoes(questoes)
				.dataCriacao(DateTime.now())
				.totalQuestoes(questoes.size())
				.build());
	}
	
	@Override
	public void atualizar(RevisaoDTO revisaoDTO) {
		Revisao revisao = modelMapper.map(revisaoDTO, Revisao.class);
		revisaoRepositorio.save(revisao);
	}

	@Override
	public void remover(String id) {
		revisaoRepositorio.deleteById(id);
	}

	@Override
	public RevisaoDTO editar(String id) {
		return modelMapper.map(revisaoRepositorio.findById(id).get(), RevisaoDTO.class);
	}

	@Override
	public List<RevisaoDTO> listar(FiltroRevisao filtro) {
		Type targetListType = new TypeToken<List<RevisaoDTO>>() {}.getType();
		return modelMapper.map(revisaoRepositorio.findAll(), targetListType);
	}

	@Override
	public List<RevisaoDTO> listarTodos() {
		Type targetListType = new TypeToken<List<RevisaoDTO>>() {}.getType();
		return modelMapper.map(revisaoRepositorio.findAll(), targetListType);
	}

}
